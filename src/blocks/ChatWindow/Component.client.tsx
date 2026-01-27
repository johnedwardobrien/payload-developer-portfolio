'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Typewriter from 'typewriter-effect'
import { IoMdSend } from 'react-icons/io'
import { motion } from 'framer-motion'
import { testMessages } from './test/testMessages'

type Message = {
  id: string
  text: string
  role: 'user' | 'assistant'
  timestamp: Date
}

type ChatWindowClientProps = {
  helpText?: string | null
  chatType?: string | null
  placeholders?: unknown[] | null
}

export const ChatWindowClient: React.FC<ChatWindowClientProps> = ({
  helpText,
  chatType,
  placeholders,
}) => {
  const testingMessages = false
  const [isChatStarted, setIsChatStarted] = useState(testingMessages ? true : false)
  const [messages, setMessages] = useState<Message[]>(testingMessages ? testMessages : [])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [textareaFocused, setTextareaFocused] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  let pineconeIndex: string = ''
  let promptContext: string = ''
  let promptInstructions: string = ''
  const chatEndpoint = chatType ? `/api/chat/${chatType}` : '/api/chat/character-dialogue'
  const stringPlaceholderArr = (placeholders?.map((obj: any) => obj?.textInput).filter(Boolean) ?? [
    'Type your message...',
  ]) as string[]

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
        const response = await fetch(chatEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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
        const response = await fetch(chatEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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

  if (!isChatStarted) {
    return (
      <div
        className="intro-chat-window fixed inset-0 w-full flex items-center justify-center"
        style={{ backgroundColor: '#FFDDC1' }}
      >
        <div className="inner w-[95%] md:w-[85%] lg:w-[75%] h-[95%] md:h-[75%] mx-auto">
          <div className="title-cont">
            <h1>Quixote Chat</h1>
          </div>
          <form
            onSubmit={handleInitialSubmit}
            className="form flex flex-col gap-4 w-full max-w-md md:max-w-none"
          >
            {helpText && <p className="text-muted-foreground mb-4">{helpText}</p>}
            <div className="inner flex flex-col gap-2">
              <div className="inner-inner flex flex-col md:flex-row gap-2">
                <div className="relative flex-1">
                  {!textareaFocused && !inputValue.length && (
                    <Typewriter
                      options={{
                        strings: stringPlaceholderArr,
                        autoStart: true,
                        loop: true,
                        delay: 35,
                        deleteSpeed: 15,
                      }}
                    />
                  )}
                  <Textarea
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value)
                      setError(null)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleInitialSubmit(e as unknown as React.FormEvent)
                      }
                    }}
                    onFocus={(e) => {
                      console.log('working')
                      setTextareaFocused(true)
                    }}
                    onBlur={() => {
                      setTextareaFocused(false)
                    }}
                    placeholder=""
                    className="flex-1 border-0"
                  />
                </div>
                <Button type="submit" className="bg-muted text-espresso hover:bg-muted/80">
                  Adventure!
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
    <div className="chat-window inset-0 flex" style={{ backgroundColor: '#FFDDC1' }}>
      <div className="title-cont">
        <h1>Quixote Chat</h1>
      </div>
      {/* Chat Messages Area */}
      <div className="chat-cont-outer">
        <div ref={chatContainerRef} className="chat-cont-inner" data-lenis-prevent>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={cn(
                'message-cont flex',
                message.role === 'user' ? 'justify-end' : 'justify-start',
              )}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={cn(
                  'message-cont-inner max-w-[80%] rounded-lg px-4 py-2',
                  message.role === 'user'
                    ? 'bg-muted text-espresso'
                    : 'bg-warm-sand/25 text-espresso',
                )}
              >
                <p className="message whitespace-pre-wrap text-espresso">{message.text}</p>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <Typewriter
              options={{
                strings: '...',
                autoStart: true,
                loop: true,
                delay: 35,
                deleteSpeed: 15,
                cursor: '',
              }}
            />
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input at Bottom */}
        <div className="chat-input">
          <form onSubmit={handleChatSubmit} className="form">
            <div className="chat-input-inner flex-1 relative">
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
                placeholder=""
                className="chat-window-textarea border-0"
                maxLength={500}
              />
              {inputValue.length >= 450 && (
                <span className="char-left-cont">
                  <span className="char-left">{inputValue.length}</span> / 500
                </span>
              )}
            </div>
            <motion.button
              type="submit"
              className="button"
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: inputValue.length ? 1 : 0,
                pointerEvents: inputValue.length ? 'auto' : 'none',
              }}
              transition={{ duration: 0.2 }}
            >
              <IoMdSend />
            </motion.button>
          </form>
          {error && <p className="text-xs text-red-500 mt-2 px-2">{error}</p>}
        </div>
      </div>
    </div>
  )
}
