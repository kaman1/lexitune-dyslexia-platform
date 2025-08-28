'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Copy, Send, Trash2, Settings, Zap, Code, TestTube } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { toast } from 'sonner'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isLoading?: boolean
}

interface APIConfig {
  endpoint: string
  model: string
  temperature: number
  maxTokens: number
}

export default function GPTOSSChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [apiConfig, setApiConfig] = useState<APIConfig>({
    endpoint: 'http://57.151.9.6',
    model: 'gpt-oss-lite',
    temperature: 0.7,
    maxTokens: 500
  })
  const [showConfig, setShowConfig] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const testConnection = async () => {
    // Try direct connection first
    try {
      const response = await fetch(`${apiConfig.endpoint}/api/tags`)
      const data = await response.json()
      
      if (response.ok && data.models && data.models.length > 0) {
        const gptOssModel = data.models.find((m: any) => m.name.includes('gpt-oss'))
        const modelName = gptOssModel?.name || data.models[0]?.name
        toast.success(`Direct connection successful! Model: ${modelName}`)
        return true
      }
    } catch (directError) {
      console.log('Direct connection failed, trying proxy...', directError)
    }

    // Fallback to proxy API
    try {
      const response = await fetch('/api/gpt-oss-proxy?endpoint=api/tags')
      const data = await response.json()
      
      if (response.ok && data.models && data.models.length > 0) {
        const gptOssModel = data.models.find((m: any) => m.name.includes('gpt-oss'))
        const modelName = gptOssModel?.name || data.models[0]?.name
        toast.success(`Proxy connection successful! Model: ${modelName}`)
        return true
      } else {
        toast.error('Connection failed: No models found')
        return false
      }
    } catch (proxyError) {
      toast.error(`Connection failed: ${proxyError instanceof Error ? proxyError.message : 'Unknown error'}`)
      return false
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isLoading: true
    }

    setMessages(prev => [...prev, userMessage, loadingMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Try direct connection first
      let response: Response | null = null;
      let data: any = null;

      try {
        response = await fetch(`${apiConfig.endpoint}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: apiConfig.model,
            messages: [
              ...messages.map(msg => ({
                role: msg.role,
                content: msg.content
              })),
              {
                role: 'user',
                content: inputMessage.trim()
              }
            ],
            temperature: apiConfig.temperature,
            max_tokens: apiConfig.maxTokens
          })
        })

        if (response.ok) {
          data = await response.json()
        } else {
          throw new Error(`Direct connection failed: ${response.status}`)
        }
      } catch (directError) {
        console.log('Direct API call failed, trying proxy...', directError)
        
        // Fallback to proxy API
        response = await fetch('/api/gpt-oss-proxy?endpoint=api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: apiConfig.model,
            messages: [
              ...messages.map(msg => ({
                role: msg.role,
                content: msg.content
              })),
              {
                role: 'user',
                content: inputMessage.trim()
              }
            ],
            temperature: apiConfig.temperature,
            max_tokens: apiConfig.maxTokens
          })
        })

        if (!response.ok) {
          throw new Error(`Proxy error! status: ${response.status}`)
        }

        data = await response.json()
      }

      const assistantContent = data.message?.content || data.choices?.[0]?.message?.content || 'No response received'

      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id 
          ? { ...msg, content: assistantContent, isLoading: false }
          : msg
      ))

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id 
          ? { 
              ...msg, 
              content: `❌ **Error**: ${errorMessage}\n\nPlease check:\n- API endpoint is correct\n- GPT-OSS service is running\n- Network connectivity`, 
              isLoading: false 
            }
          : msg
      ))
      
      toast.error(`Failed to send message: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  const clearMessages = () => {
    setMessages([])
    toast.success('Chat history cleared')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const testPrompts = [
    "Explain how React hooks work",
    "Write a Python function to sort an array",
    "Create a SQL query to find duplicate records",
    "Show me how to use Docker containers"
  ]

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card className="shadow-lg border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-blue-500" />
              <CardTitle>GPT-OSS Chat Interface</CardTitle>
              <Badge variant="outline" className="text-xs">
                {apiConfig.endpoint.replace('http://', '')}
              </Badge>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={testConnection}
                className="flex items-center space-x-1"
              >
                <TestTube className="h-4 w-4" />
                <span>Test</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowConfig(!showConfig)}
                className="flex items-center space-x-1"
              >
                <Settings className="h-4 w-4" />
                <span>Config</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearMessages}
                className="flex items-center space-x-1"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear</span>
              </Button>
            </div>
          </div>
          
          {showConfig && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-4 border">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">API Endpoint</label>
                  <Input
                    value={apiConfig.endpoint}
                    onChange={(e) => setApiConfig(prev => ({ ...prev, endpoint: e.target.value }))}
                    placeholder="http://57.151.9.6"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Model</label>
                  <Input
                    value={apiConfig.model}
                    onChange={(e) => setApiConfig(prev => ({ ...prev, model: e.target.value }))}
                    placeholder="gpt-oss-lite"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Temperature</label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="2"
                    value={apiConfig.temperature}
                    onChange={(e) => setApiConfig(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Max Tokens</label>
                  <Input
                    type="number"
                    min="1"
                    max="2000"
                    value={apiConfig.maxTokens}
                    onChange={(e) => setApiConfig(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Quick Test Prompts */}
          {messages.length === 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Quick Test Prompts:</h3>
              <div className="grid grid-cols-2 gap-2">
                {testPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage(prompt)}
                    className="text-left justify-start h-auto py-2 px-3"
                  >
                    <Code className="h-3 w-3 mr-2 flex-shrink-0" />
                    <span className="text-xs">{prompt}</span>
                  </Button>
                ))}
              </div>
              <Separator />
            </div>
          )}

          {/* Chat Messages */}
          <ScrollArea className="h-96 w-full pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 shadow-sm ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white ml-auto'
                        : 'bg-muted/80 border'
                    }`}
                  >
                    {message.isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin h-4 w-4 border-2 border-gray-400 rounded-full border-t-transparent"></div>
                        <span className="text-sm text-muted-foreground">Generating response...</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                          <ReactMarkdown
                            components={{
                              code({node, inline, className, children, ...props}) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                  <div className="relative my-2">
                                    <SyntaxHighlighter
                                      style={oneDark}
                                      language={match[1]}
                                      PreTag="div"
                                      className="rounded-md text-sm"
                                      customStyle={{
                                        margin: 0,
                                        borderRadius: '6px',
                                        fontSize: '14px'
                                      }}
                                      {...props}
                                    >
                                      {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="absolute top-2 right-2 h-6 w-6 p-0"
                                      onClick={() => copyToClipboard(String(children))}
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ) : (
                                  <code className={`${className} bg-muted px-1 py-0.5 rounded text-sm`} {...props}>
                                    {children}
                                  </code>
                                )
                              }
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                        
                        {message.role === 'assistant' && message.content && (
                          <div className="flex items-center justify-between pt-2 border-t border-muted mt-3">
                            <span className="text-xs text-muted-foreground">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(message.content)}
                              className="h-6 px-2 text-xs hover:bg-background/80"
                            >
                              <Copy className="h-3 w-3 mr-1" />
                              <span>Copy</span>
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="flex space-x-2 pt-4 border-t">
            <Input
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... (Press Enter to send)"
              disabled={isLoading}
              className="flex-1 min-h-[44px] text-base"
            />
            <Button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-4 min-h-[44px] bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground text-center">
            Connected to GPT-OSS • Model: {apiConfig.model} • Endpoint: {apiConfig.endpoint}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}