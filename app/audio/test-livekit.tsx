'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, Mic, MicOff, Volume2, VolumeX, Loader2, Settings } from 'lucide-react';
import { toast } from 'sonner';

// Import LiveKit client (will be loaded dynamically)
let LiveKitClient: any = null;

interface LiveKitTestState {
  isConnected: boolean;
  isPublishing: boolean;
  isSubscribing: boolean;
  localAudioTrack: any;
  remoteAudioTrack: any;
  roomName: string;
  participantName: string;
  room: any;
  localParticipant: any;
}

export default function TestLiveKit() {
  const [state, setState] = useState<LiveKitTestState>({
    isConnected: false,
    isPublishing: false,
    isSubscribing: false,
    localAudioTrack: null,
    remoteAudioTrack: null,
    roomName: 'test-room',
    participantName: 'test-user',
    room: null,
    localParticipant: null
  });
  
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [isLiveKitLoaded, setIsLiveKitLoaded] = useState(false);
  
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);

  // Load LiveKit client dynamically
  useEffect(() => {
    const loadLiveKit = async () => {
      try {
        const { Room, RoomEvent, Track, LocalTrackPublication } = await import('livekit-client');
        LiveKitClient = { Room, RoomEvent, Track, LocalTrackPublication };
        setIsLiveKitLoaded(true);
        addLog('LiveKit client loaded successfully');
      } catch (error) {
        addLog('Failed to load LiveKit client. Make sure livekit-client is installed.');
        console.error('LiveKit load error:', error);
      }
    };

    loadLiveKit();
  }, []);

  // Add log message
  const addLog = (message: string) => {
    setLogMessages(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleConnect = async () => {
    if (!state.roomName.trim() || !state.participantName.trim()) {
      toast.error('Please enter room name and participant name');
      return;
    }

    if (!isLiveKitLoaded) {
      toast.error('LiveKit client not loaded yet. Please wait.');
      return;
    }

    setIsConnecting(true);
    addLog(`Attempting to connect to room: ${state.roomName}`);

    try {
      // Get token from our API
      const tokenResponse = await fetch('/api/livekit/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomName: state.roomName,
          participantName: state.participantName
        })
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to get access token');
      }

      const { token, serverUrl } = await tokenResponse.json();
      addLog('Access token received, connecting to room...');

      // Create room and connect
      const room = new LiveKitClient.Room({
        adaptiveStream: true,
        dynacast: true,
      });

      // Set up event listeners
      room.on(LiveKitClient.RoomEvent.ParticipantConnected, (participant: any) => {
        addLog(`Participant connected: ${participant.identity}`);
      });

      room.on(LiveKitClient.RoomEvent.ParticipantDisconnected, (participant: any) => {
        addLog(`Participant disconnected: ${participant.identity}`);
      });

      room.on(LiveKitClient.RoomEvent.TrackSubscribed, (track: any, publication: any, participant: any) => {
        addLog(`Track subscribed: ${track.kind} from ${participant.identity}`);
        
        if (track.kind === LiveKitClient.Track.Kind.Audio) {
          // Attach remote audio track
          if (remoteAudioRef.current) {
            track.attach(remoteAudioRef.current);
          }
          setState(prev => ({ ...prev, remoteAudioTrack: track }));
        }
      });

      // Connect to room
      await room.connect(serverUrl, token);
      
      setState(prev => ({ 
        ...prev, 
        isConnected: true, 
        room,
        localParticipant: room.localParticipant
      }));
      
      addLog('Successfully connected to LiveKit room');
      toast.success('Connected to LiveKit room!');
      
    } catch (error) {
      addLog(`Connection failed: ${error}`);
      toast.error('Failed to connect to LiveKit room');
      console.error('Connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    if (state.room) {
      try {
        await state.room.disconnect();
        addLog('Disconnected from LiveKit room');
      } catch (error) {
        addLog(`Disconnect error: ${error}`);
      }
    }

    setState(prev => ({ 
      ...prev, 
      isConnected: false, 
      isPublishing: false, 
      isSubscribing: false,
      room: null,
      localParticipant: null
    }));
    
    toast.success('Disconnected from room');
  };

  const handleToggleMicrophone = async () => {
    if (!state.isConnected || !state.localParticipant) {
      toast.error('Must be connected to a room first');
      return;
    }

    setIsLoading(true);
    
    try {
      if (state.isPublishing) {
        // Stop publishing audio
        await state.localParticipant.setMicrophoneEnabled(false);
        setState(prev => ({ ...prev, isPublishing: false }));
        addLog('Microphone turned off');
        toast.success('Microphone turned off');
      } else {
        // Start publishing audio
        await state.localParticipant.setMicrophoneEnabled(true);
        setState(prev => ({ ...prev, isPublishing: true }));
        addLog('Microphone turned on');
        toast.success('Microphone turned on');
      }
    } catch (error) {
      addLog(`Microphone toggle failed: ${error}`);
      toast.error('Failed to toggle microphone');
      console.error('Microphone error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAudio = () => {
    if (state.isSubscribing) {
      setState(prev => ({ ...prev, isSubscribing: false }));
      addLog('Remote audio muted');
      toast.success('Remote audio muted');
    } else {
      setState(prev => ({ ...prev, isSubscribing: true }));
      addLog('Remote audio unmuted');
      toast.success('Remote audio unmuted');
    }
  };

  const clearLogs = () => {
    setLogMessages([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🎥</span>
            <span>LiveKit Audio Test</span>
            {!isLiveKitLoaded && (
              <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded">
                Loading...
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Connection Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="room-name">Room Name</Label>
              <input
                id="room-name"
                type="text"
                value={state.roomName}
                onChange={(e) => setState(prev => ({ ...prev, roomName: e.target.value }))}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                disabled={state.isConnected}
                placeholder="Enter room name"
              />
            </div>
            
            <div>
              <Label htmlFor="participant-name">Participant Name</Label>
              <input
                id="participant-name"
                type="text"
                value={state.participantName}
                onChange={(e) => setState(prev => ({ ...prev, participantName: e.target.value }))}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                disabled={state.isConnected}
                placeholder="Enter your name"
              />
            </div>
          </div>

          {/* Connection Controls */}
          <div className="flex items-center space-x-3">
            {!state.isConnected ? (
              <Button
                onClick={handleConnect}
                disabled={isConnecting || !state.roomName.trim() || !state.participantName.trim() || !isLiveKitLoaded}
                className="bg-green-600 hover:bg-green-700"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Connect to Room'
                )}
              </Button>
            ) : (
              <Button
                onClick={handleDisconnect}
                variant="outline"
                className="border-red-200 text-red-700 hover:bg-red-50"
              >
                Disconnect
              </Button>
            )}
          </div>

          {/* Audio Controls */}
          {state.isConnected && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-3">Audio Controls</h4>
              
              <div className="flex items-center space-x-3">
                <Button
                  onClick={handleToggleMicrophone}
                  disabled={isLoading}
                  variant={state.isPublishing ? "outline" : "default"}
                  className={state.isPublishing ? 
                    "border-red-200 text-red-700 hover:bg-red-50" : 
                    "bg-green-600 hover:bg-green-700"
                  }
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : state.isPublishing ? (
                    <>
                      <MicOff className="w-4 h-4 mr-2" />
                      Turn Off Mic
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4 mr-2" />
                      Turn On Mic
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleToggleAudio}
                  variant={state.isSubscribing ? "outline" : "default"}
                  className={state.isSubscribing ? 
                    "border-blue-200 text-blue-700 hover:bg-blue-700" : 
                    "bg-blue-600 hover:bg-blue-700"
                  }
                >
                  {state.isSubscribing ? (
                    <>
                      <VolumeX className="w-4 h-4 mr-2" />
                      Mute Audio
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 mr-2" />
                      Unmute Audio
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-3 text-sm text-blue-700">
                <p>Status: {state.isPublishing ? 'Publishing audio' : 'Microphone off'}</p>
                <p>Remote Audio: {state.isSubscribing ? 'Unmuted' : 'Muted'}</p>
              </div>
            </div>
          )}

          {/* Audio Elements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Local Audio (Your microphone)</Label>
              <audio
                ref={localAudioRef}
                autoPlay
                muted
                className="w-full mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                This will play your microphone audio locally
              </p>
            </div>
            
            <div>
              <Label>Remote Audio (Other participants)</Label>
              <audio
                ref={remoteAudioRef}
                autoPlay
                className="w-full mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                This will play audio from other participants
              </p>
            </div>
          </div>

          {/* Log Messages */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-800">Activity Log</h4>
              <Button
                onClick={clearLogs}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Clear Logs
              </Button>
            </div>
            
            <div className="max-h-40 overflow-y-auto space-y-1">
              {logMessages.length === 0 ? (
                <p className="text-sm text-gray-500">No activity yet...</p>
              ) : (
                logMessages.map((message, index) => (
                  <div key={index} className="text-xs text-gray-600 font-mono">
                    {message}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Setup Instructions */}
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">Setup Instructions:</h4>
            <div className="text-sm text-yellow-700 space-y-2">
              <p>To test LiveKit audio functionality:</p>
              <ol className="list-decimal list-inside ml-4 space-y-1">
                <li>Start the LiveKit server: <code className="bg-yellow-100 px-1 rounded">cd livekit-server && ./start.sh</code></li>
                <li>Make sure Docker is running</li>
                <li>Enter a room name and participant name</li>
                <li>Click "Connect to Room"</li>
                <li>Test microphone and audio controls</li>
              </ol>
              <p className="mt-2">
                <strong>Note:</strong> This now uses the real LiveKit client for actual audio functionality!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
