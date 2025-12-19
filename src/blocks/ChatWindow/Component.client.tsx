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
      <div className="w-[95%] md:w-[85%] lg:w-[75%] mx-auto">
        <form onSubmit={handleInitialSubmit} className="flex flex-col gap-4">
          {helpText && <p className="text-sm text-muted-foreground mb-4">{helpText}</p>}
          <div className="flex gap-2">
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
    )
  }

  return (
    <div className="w-[95%] md:w-[85%] lg:w-[75%] mx-auto h-[calc(100vh-12rem)] flex flex-col">
      {/* Chat Messages Area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
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
      <form onSubmit={handleChatSubmit} className="flex gap-2 pt-4 border-t border-border">
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 h-20 chat-window-textarea"
        />
        <Button type="submit" disabled={!inputValue.trim()}>
          Send
        </Button>
      </form>
    </div>
  )
}
