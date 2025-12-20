'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

type Message = {
  id: string
  text: string
  role: 'user' | 'assistant'
  timestamp: Date
}

type ChatWindowClientProps = {
  helpText?: string | null
  pineconeIndex?: string | null
  promptContext?: string | null
  promptInstructions?: string | null
  placeholders?: unknown[] | null
}

export const ChatWindowClient: React.FC<ChatWindowClientProps> = ({
  helpText,
  pineconeIndex,
  promptContext,
  promptInstructions,
}) => {
  const [isChatStarted, setIsChatStarted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Prevent page scroll when ChatWindow is mounted
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      // Restore page scroll when ChatWindow unmounts
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isChatStarted) {
      scrollToBottom()
    }
  }, [messages, isChatStarted])

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedValue = inputValue.trim()
    if (trimmedValue) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: trimmedValue,
        role: 'user',
        timestamp: new Date(),
      }
      setMessages([newMessage])
      setIsChatStarted(true)
      setInputValue('')
      setIsLoading(true)
      setError(null)

      try {
        // Call character dialogue chat API
        const response = await fetch('/api/chat/character-dialogue', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pineconeIndex,
            promptContext,
            promptInstructions,
            message: trimmedValue,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to get response')
        }

        const data = await response.json()

        if (data.response) {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: data.response,
            role: 'assistant',
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, assistantMessage])
        }
      } catch (error) {
        console.error('Error fetching chat response:', error)
        setError('Failed to get response. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedValue = inputValue.trim()
    if (trimmedValue) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: trimmedValue,
        role: 'user',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, newMessage])
      setInputValue('')
      setIsLoading(true)
      setError(null)

      try {
        // Call character dialogue chat API
        const response = await fetch('/api/chat/character-dialogue', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pineconeIndex,
            promptContext,
            promptInstructions,
            message: trimmedValue,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to get response')
        }

        const data = await response.json()

        if (data.response) {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: data.response,
            role: 'assistant',
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, assistantMessage])
        }
      } catch (error) {
        console.error('Error fetching chat response:', error)
        setError('Failed to get response. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Validate required fields
  if (!pineconeIndex || !promptContext || !promptInstructions) {
    return (
      <div
        className="fixed inset-0 w-full flex items-center justify-center"
        style={{ backgroundColor: '#FFDDC1' }}
      >
        <div className="text-center p-8">
          <p className="text-red-500">
            Error: Chat window configuration is incomplete. Please configure Pinecone Index, Prompt
            Context, and Prompt Instructions.
          </p>
        </div>
      </div>
    )
  }

  if (!isChatStarted) {
    return (
      <div
        className="fixed inset-0 w-full flex items-center justify-center"
        style={{ backgroundColor: '#FFDDC1' }}
      >
        <div className="w-[95%] md:w-[85%] lg:w-[75%] h-[95%] md:h-[75%] mx-auto flex items-center justify-center">
          <form
            onSubmit={handleInitialSubmit}
            className="flex flex-col gap-4 w-full max-w-md md:max-w-none"
          >
            {helpText && <p className="text-sm text-muted-foreground mb-4">{helpText}</p>}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col md:flex-row gap-2">
                <Input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value)
                    setError(null)
                  }}
                  placeholder="Type your message..."
                  className="flex-1 border-0"
                />
                <Button type="submit" className="bg-muted text-espresso hover:bg-muted/80">
                  Submit
                </Button>
              </div>
              {error && <p className="text-xs text-red-500 px-2">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 w-full flex items-center justify-center"
      style={{ backgroundColor: '#FFDDC1' }}
    >
      {/* Chat Messages Area */}
      <div className="w-[95%] md:w-[85%] lg:w-[75%] h-[95%] md:h-[75%] mx-auto flex flex-col">
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto space-y-4 px-2 pt-4 bg-white rounded-lg"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}
            >
              <div
                className={cn(
                  'max-w-[80%] rounded-lg px-4 py-2',
                  message.role === 'user'
                    ? 'bg-muted text-espresso'
                    : 'bg-warm-sand/25 text-espresso',
                )}
              >
                <p className="text-sm whitespace-pre-wrap text-espresso">{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start px-2">
              <div className="w-5 h-5 border-2 border-warm-sand border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input at Bottom */}
        <div>
          <form onSubmit={handleChatSubmit} className="flex gap-2 pt-2">
            <div className="flex-1 relative">
              <Textarea
                value={inputValue}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setInputValue(e.target.value)
                    setError(null)
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleChatSubmit(e as unknown as React.FormEvent)
                  }
                }}
                placeholder="Type your message..."
                className="h-50 chat-window-textarea border-0"
                maxLength={500}
              />
              {inputValue.length >= 450 && (
                <span className="absolute top-full left-3 mt-1 text-xs text-muted-foreground">
                  {inputValue.length} / 500
                </span>
              )}
            </div>
            <Button type="submit" className="bg-muted text-espresso hover:bg-muted/80">
              Send
            </Button>
          </form>
          {error && <p className="text-xs text-red-500 mt-2 px-2">{error}</p>}
        </div>
      </div>
    </div>
  )
}
