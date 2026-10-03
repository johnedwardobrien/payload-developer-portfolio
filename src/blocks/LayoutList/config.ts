import type { Block } from 'payload'

import { Archive } from '../ArchiveBlock/config'

export const LayoutList: Block = {
  slug: 'layoutList',
  interfaceName: 'LayoutListBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'layoutTemplate',
      type: 'select',
      label: 'Layout Template',
      defaultValue: 'fourAcross',
      options: [
        { label: '4 across', value: 'fourAcross' },
        { label: '2 across', value: 'twoAcross' },
      ],
    },
    ...Archive.fields,
  ],
  labels: {
    plural: 'Layout Lists',
    singular: 'Layout List',
  },
}
