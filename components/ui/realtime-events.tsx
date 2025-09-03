"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Mic, Volume2, Wifi, WifiOff, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  type: 'user_speech' | 'ai_response' | 'system' | 'error' | 'connection';
  message: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

interface RealtimeEventsProps {
  className?: string;
  events: Event[];
  isConnected: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  onClearEvents?: () => void;
}

export function RealtimeEvents({ 
  className, 
  events, 
  isConnected, 
  isListening, 
  isSpeaking, 
  onClearEvents 
}: RealtimeEventsProps) {
  const [autoScroll, setAutoScroll] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');

  // Auto-scroll to bottom when new events arrive
  useEffect(() => {
    if (autoScroll) {
      const scrollArea = document.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }
  }, [events, autoScroll]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'user_speech':
        return <Mic className="w-4 h-4 text-blue-500" />;
      case 'ai_response':
        return <Volume2 className="w-4 h-4 text-green-500" />;
      case 'system':
        return <Settings className="w-4 h-4 text-gray-500" />;
      case 'error':
        return <WifiOff className="w-4 h-4 text-red-500" />;
      case 'connection':
        return <Wifi className="w-4 h-4 text-purple-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'user_speech':
        return 'border-blue-200 bg-blue-50';
      case 'ai_response':
        return 'border-green-200 bg-green-50';
      case 'system':
        return 'border-gray-200 bg-gray-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'connection':
        return 'border-purple-200 bg-purple-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const filteredEvents = filterType === 'all' 
    ? events 
    : events.filter(event => event.type === filterType);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Real-Time Events
            <Badge variant="outline" className="text-xs">
              {events.length} events
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoScroll(!autoScroll)}
              className={cn(
                "text-xs",
                autoScroll && "bg-blue-100 border-blue-300"
              )}
            >
              {autoScroll ? "Auto-scroll ON" : "Auto-scroll OFF"}
            </Button>
            {onClearEvents && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearEvents}
                className="text-xs text-red-600 hover:text-red-700"
              >
                Clear
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Status Bar */}
        <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-3 h-3 rounded-full",
              isConnected ? "bg-green-500" : "bg-red-500"
            )} />
            <span className="text-sm font-medium">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Mic className={cn(
              "w-4 h-4",
              isListening ? "text-red-500" : "text-gray-400"
            )} />
            <span className="text-sm">
              {isListening ? "Listening" : "Not listening"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Volume2 className={cn(
              "w-4 h-4",
              isSpeaking ? "text-blue-500" : "text-gray-400"
            )} />
            <span className="text-sm">
              {isSpeaking ? "AI Speaking" : "AI Silent"}
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4">
          {['all', 'user_speech', 'ai_response', 'system', 'connection', 'error'].map((type) => (
            <Button
              key={type}
              variant={filterType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType(type)}
              className="text-xs capitalize"
            >
              {type.replace('_', ' ')}
              <Badge variant="secondary" className="ml-1 text-xs">
                {events.filter(e => e.type === type).length}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Events List */}
        <ScrollArea className="h-96 w-full">
          <div className="space-y-2">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No events yet</p>
                <p className="text-sm">Start a conversation to see real-time events</p>
              </div>
            ) : (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg border",
                    getEventColor(event.type)
                  )}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getEventIcon(event.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium capitalize text-gray-600">
                        {event.type.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTime(event.timestamp)}
                      </span>
                      {event.metadata && Object.keys(event.metadata).length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {Object.keys(event.metadata).length} metadata
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-800">{event.message}</p>
                    {event.metadata && Object.keys(event.metadata).length > 0 && (
                      <details className="mt-2">
                        <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                          Show metadata
                        </summary>
                        <pre className="text-xs bg-white p-2 rounded mt-1 overflow-x-auto">
                          {JSON.stringify(event.metadata, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Event Stats */}
        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            <div>
              <div className="font-medium text-blue-600">
                {events.filter(e => e.type === 'user_speech').length}
              </div>
              <div className="text-gray-500">User Speech</div>
            </div>
            <div>
              <div className="font-medium text-green-600">
                {events.filter(e => e.type === 'ai_response').length}
              </div>
              <div className="text-gray-500">AI Responses</div>
            </div>
            <div>
              <div className="font-medium text-purple-600">
                {events.filter(e => e.type === 'connection').length}
              </div>
              <div className="text-gray-500">Connections</div>
            </div>
            <div>
              <div className="font-medium text-red-600">
                {events.filter(e => e.type === 'error').length}
              </div>
              <div className="text-gray-500">Errors</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
