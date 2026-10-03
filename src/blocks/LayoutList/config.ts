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
    ...Archive.fields,
  ],
  labels: {
    plural: 'Layout Lists',
    singular: 'Layout List',
  },
}
