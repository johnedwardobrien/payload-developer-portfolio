import type { Block } from 'payload'

export const AnimationBlock: Block = {
	slug: 'animationBlock',
	interfaceName: 'AnimationBlock',
	fields: [
		{
			name: 'animation',
			type: 'select',
			label: 'Animation',
			required: true,
			defaultValue: 'cube',
			options: [
				{
					label: 'Cube',
					value: 'cube',
				},
			],
		},
		{
			name: 'alignment',
			type: 'select',
			label: 'Alignment',
			required: true,
			defaultValue: 'center',
			options: [
				{
					label: 'Left',
					value: 'left',
				},
				{
					label: 'Center',
					value: 'center',
				},
				{
					label: 'Right',
					value: 'right',
				},
			],
		},
	],
}
