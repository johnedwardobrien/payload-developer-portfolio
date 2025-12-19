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
  placeholders?: unknown[] | null
}

export const ChatWindowClient: React.FC<ChatWindowClientProps> = ({ helpText }) => {
  const [isChatStarted, setIsChatStarted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
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

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        role: 'user',
        timestamp: new Date(),
      }
      setMessages([newMessage])
      setIsChatStarted(true)
      setInputValue('')
    }
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        role: 'user',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, newMessage])
      setInputValue('')
    }
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
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" disabled={!inputValue.trim()}>
                Submit
              </Button>
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
          className="flex-1 overflow-y-auto space-y-4 pr-2 pt-4 bg-white rounded-lg"
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
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input at Bottom */}
        <div>
          <form onSubmit={handleChatSubmit} className="flex gap-2 pt-2 border-t border-border">
            <div className="flex-1 relative">
              <Textarea
                value={inputValue}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setInputValue(e.target.value)
                  }
                }}
                placeholder="Type your message..."
                className="h-50 chat-window-textarea"
                maxLength={500}
              />
              {inputValue.length >= 450 && (
                <span className="absolute top-full left-3 mt-1 text-xs text-muted-foreground">
                  {inputValue.length} / 500
                </span>
              )}
            </div>
            <Button type="submit" disabled={!inputValue.trim()}>
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
