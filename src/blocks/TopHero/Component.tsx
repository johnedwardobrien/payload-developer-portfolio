'use client'

import React, { useRef } from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

import { Media } from '@/components/Media'

type Props = {
	disableInnerContainer?: boolean
	title?: string
	subtitle?: string
	heroImage?: any
	[key: string]: unknown
} & React.ComponentProps<typeof Parallax>

export const TopHero: React.FC<Props> = (props) => {
	const { title, subtitle, heroImage, disableInnerContainer: _disableInnerContainer } = props
	return (
		<div
			className="w-full h-screen rounded-b-full"
		>
			{heroImage && typeof heroImage === 'object' && (
				<div className="absolute inset-0 -z-10">
					<Media
						className="w-full h-full"
						htmlElement="div"
						resource={heroImage}
						videoClassName="absolute inset-0 w-full h-full object-cover"
					/>
				</div>
			)}
			<div className="absolute bottom-0 left-0 w-full p-4 md:p-8 z-10">
				<div className="text-left text-white">
					{title && <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{title}</h1>}
					{subtitle && <p className="text-lg md:text-xl lg:text-2xl">{subtitle}</p>}
				</div>
			</div>
		</div>
	)
}
