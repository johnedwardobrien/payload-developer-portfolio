'use client'

import React from 'react'

import type { YachtParallaxItem } from '@/payload-types'

import { Button } from '@/components/ui/button'
import { ImageMedia } from '@/components/Media/ImageMedia'
import { formatEventDate } from '@/utilities/formatEventDate'
import './Component.css'

type EventSideScrollerProps = Pick<YachtParallaxItem, 'title' | 'buttonText' | 'events'>

type Props = {
  disableInnerContainer?: boolean
  index?: number
  id?: string
} & EventSideScrollerProps

export const EventSideScroller: React.FC<Props> = (props) => {
  const { title, buttonText, events, index, id } = props

  if (!events || !Array.isArray(events) || events.length === 0) {
    return null
  }

  return (
    <div
      className={`EventSideScroller container pb-8 ${index ? `item-${index}` : ''}`}
    >
      <div className="grid-cont">
        {/* Event Cards - Left Column */}
        <div className="cards-cont">
          <div className="flex flex-col gap-4">
            {events.map((event, index) => {
              if (event.blockType !== 'eventCard') return null

              const { title: eventTitle, fromDate, toDate, linkText, image } = event

              return (
                <div key={event.id || index} className="event-card">
                  {/* Background Image */}
                  {image && typeof image === 'object' && (
                    <ImageMedia
                      resource={image}
                      fill
                      imgClassName="event-card-background"
                      pictureClassName="event-card-background"
                    />
                  )}

                  {/* Content Overlay */}
                  <div className="content">
                    <div className="event-card-inner">
                      {/* Row 1: Card Title, aligned left */}
                      {eventTitle && (
                        <div className="text-left">
                          <h3 className="event-card-title">{eventTitle}</h3>
                        </div>
                      )}

                      {/* Row 2: From and To Dates, separated by bold hyphen, aligned left */}
                      {(fromDate || toDate) && (
                        <div className="text-left">
                          <span className="event-card-dates">
                            {fromDate && formatEventDate(fromDate)}
                            {fromDate && toDate && <span className="font-bold"> - </span>}
                            {toDate && formatEventDate(toDate)}
                          </span>
                        </div>
                      )}

                      {/* Row 3: Link Text, aligned right */}
                      {linkText && (
                        <div className="text-right event-card-link">
                          <span className="underline">{linkText}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Title and Button - Right Column */}
        <div className="event-header-container">
          <div className="flex flex-col gap-4">
            {title && <h2 className="title text-heading-2 font-semibold">{title}</h2>}
            {buttonText && (
              <button>
                {buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
