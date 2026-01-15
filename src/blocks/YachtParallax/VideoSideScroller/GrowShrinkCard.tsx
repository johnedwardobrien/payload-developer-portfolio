'use client'

import { useRef, useEffect } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent, useInView } from 'framer-motion';
import { StandardCard } from '@/payload-types';
import { VideoCard } from '@/components/VideoCard';

export const GrowShrinkCard = ({
	videoCard
}: {
	videoCard: StandardCard
}) => {
	const cardRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: cardRef,
		offset: ["end end", "start start"]
	});
	const scale = useTransform(scrollYProgress, [0, .2, .3, 1], [.7, .75, 1, 1]);

	return <motion.div
		ref={cardRef}
		className='card'
		style={{
			marginBottom: '5%',
			scale
		}}
	>
		<VideoCard card={videoCard} />
	</motion.div>;
};