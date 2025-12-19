import type { Block } from 'payload'

export const Placeholder: Block = {
  slug: 'placeholder',
  interfaceName: 'Placeholder',
  fields: [
    {
      name: 'textInput',
      type: 'text',
      label: 'Text Input',
    },
  ],
}
