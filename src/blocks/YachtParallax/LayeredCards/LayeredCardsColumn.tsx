'use client'

import React from 'react'

import type { StandardCard } from '@/payload-types'
import { ImageCard } from '@/components/ImageCard'

type Props = {
  cards: StandardCard[]
}

export const LayeredCardsColumn: React.FC<Props> = ({ cards }) => {
  return (
    <div className="layered-cards-wrapper">
      {cards.map((card, index) => (
        <div key={card.id || index} className="layered-card-item">
          <ImageCard card={card} />
        </div>
      ))}
    </div>
  )
}

