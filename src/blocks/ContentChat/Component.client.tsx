'use client'

import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

type ContentChatClientProps = {
  helpText?: string | null
  pineconeIndex?: string | null
  promptContext?: string | null
  promptInstructions?: string | null
  placeholders?: unknown[] | null
}

export const ContentChatClient: React.FC<ContentChatClientProps> = ({
  helpText,
  pineconeIndex,
  promptContext,
  promptInstructions,
}) => {
  const [showForm, setShowForm] = useState(true)
  const [showSpinner, setShowSpinner] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const [responseText, setResponseText] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const FADE_DURATION = 1000 // 1 second

  // Form fade animation
  const formSpring = useSpring({
    opacity: showForm ? 1 : 0,
    config: { duration: FADE_DURATION },
  })

  // Spinner fade animation
  const spinnerSpring = useSpring({
    opacity: showSpinner ? 1 : 0,
    config: { duration: FADE_DURATION },
  })

  // Answer fade animation
  const answerSpring = useSpring({
    opacity: showResponse ? 1 : 0,
    config: { duration: FADE_DURATION },
  })

  useEffect(() => {
    // Prevent page scroll when ContentChat is mounted
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      // Restore page scroll when ContentChat unmounts
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedValue = inputValue.trim()
    if (trimmedValue) {
      setError(null)

      // Step 1: Immediately disable textarea and submit button
      setIsLoading(true)

      // Step 2: After 500ms, fade out the form
      setTimeout(() => {
        setShowForm(false)

        // Step 3: Immediately fade in the spinner after fade out completes
        setTimeout(() => {
          setShowSpinner(true)
        }, FADE_DURATION)
      }, 500)

      try {
        // Call content-target chat API
        const response = await fetch('/api/chat/content-target', {
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
          // Step 4: When results are in, fade out spinner and fade in results
          setShowSpinner(false)
          setTimeout(() => {
            setResponseText(data.response)
            setShowResponse(true)
            setIsLoading(false)
            setInputValue('')
          }, FADE_DURATION)
        }
      } catch (error) {
        console.error('Error fetching chat response:', error)
        setError('Failed to get response. Please try again.')
        setShowSpinner(false)
        setIsLoading(false)
        // Reset to form view on error
        setTimeout(() => {
          setShowForm(true)
        }, FADE_DURATION)
      }
    }
  }

  const handleNewQuery = () => {
    setShowResponse(false)
    setTimeout(() => {
      setResponseText('')
      setInputValue('')
      setError(null)
      setShowForm(true)
    }, FADE_DURATION)
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

  return (
    <div
      className="fixed inset-0 w-full flex items-center justify-center overflow-auto"
      style={{ backgroundColor: '#FFDDC1' }}
    >
      {/* Form View */}
      {showForm && (
        <animated.div
          style={{
            ...formSpring,
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="w-[95%] md:w-[85%] lg:w-[75%] h-[95%] md:h-[75%] mx-auto flex items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full items-center">
              {helpText && <p className="text-sm text-muted-foreground mb-4">{helpText}</p>}
              <div className="flex flex-col gap-2 w-full items-center">
                <Textarea
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value)
                    setError(null)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit(e as unknown as React.FormEvent)
                    }
                  }}
                  placeholder="Type your message..."
                  className="w-full h-[250px] md:h-[250px] lg:h-[200px] border-0 resize-none overflow-auto text-[1.2rem]"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  className="bg-muted text-espresso hover:bg-muted/80 text-[1.25rem]"
                  disabled={isLoading}
                >
                  Submit
                </Button>
                {error && <p className="text-xs text-red-500 px-2">{error}</p>}
              </div>
            </form>
          </div>
        </animated.div>
      )}

      {/* Spinner View */}
      {showSpinner && (
        <animated.div
          style={{
            ...spinnerSpring,
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="w-80 h-80 border-8 border-[#FF8C42] border-t-transparent rounded-full animate-spin" />
        </animated.div>
      )}

      {/* Answer View */}
      {showResponse && (
        <animated.div
          style={{
            ...answerSpring,
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <style>
            {`
              .content-chat-results .citation {
                font-size: min(9vw, 2.2rem) !important;
              }
            `}
          </style>
          <div className="w-[95%] md:w-[85%] lg:w-[75%] mx-auto flex flex-col items-center gap-6 py-8 mt-[10%] md:mt-[3%] lg:mt-[3%]">
            <div className="w-full max-w-4xl bg-white rounded-lg p-8 md:p-12 content-chat-results">
              <div
                className="font-medium text-espresso whitespace-pre-wrap"
                style={{ fontSize: 'min(7vw, 1.8rem)' }}
                dangerouslySetInnerHTML={{ __html: responseText }}
              />
            </div>
            <Button onClick={handleNewQuery} className="bg-muted text-espresso hover:bg-muted/80">
              New Query
            </Button>
          </div>
        </animated.div>
      )}
    </div>
  )
}
