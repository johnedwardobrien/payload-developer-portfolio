'use client'

import React from 'react'

import type { StandardCard } from '@/payload-types'

import { Media } from '@/components/Media'

type Props = {
  card: StandardCard
}

export const ImageCard: React.FC<Props> = ({ card }) => {
  const { title, subtitle, buttonText, backgroundMedia } = card

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      {backgroundMedia && (
        <Media
          htmlElement="div"
          className="absolute inset-0 w-full h-full"
          fill
          resource={backgroundMedia}
          pictureClassName="absolute inset-0 w-full h-full"
          imgClassName="object-cover"
          videoClassName="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="content absolute inset-0 flex flex-col justify-end z-10">
        <div className="inner p-6 md:p-8 lg:p-12 flex flex-col gap-4 md:gap-5 lg:gap-6">
          {subtitle && (
            <p className="subtitle text-base md:text-lg lg:text-xl text-white/90">
              {subtitle}
            </p>
          )}
          {title && (
            <h3 className="title text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
              {title}
            </h3>
          )}
          {buttonText && (
            <button className="button self-start px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors mt-2">
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

