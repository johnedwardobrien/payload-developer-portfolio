'use client'

import { useRef } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';
import { StandardCard } from '@/payload-types';
import { VideoCard } from '@/components/VideoCard';

export const GrowShrinkCard = ({
	videoCard,
	ref
}: {
	videoCard: StandardCard
	ref: any
}) => {
  	const { scrollYProgress } = useScroll({
  	  target: ref,
  	  offset: ["start end", "end start"]
  	});
	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		console.log(latest);
	})
  	const scale = useTransform(scrollYProgress, [0, 1], [1.5, 0.8])

	return <motion.div
		ref={ref}
		key={videoCard.id}
		className='card'
		style={{
			scale
		}}
	>
		<VideoCard card={videoCard} />
	</motion.div>;
};