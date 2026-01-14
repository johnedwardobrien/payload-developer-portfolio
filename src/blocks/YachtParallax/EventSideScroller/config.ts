import type { Block } from 'payload'

import { EventCard } from '../../EventCard/config'

export const EventSideScroller: Block = {
  slug: 'eventSideScroller',
  interfaceName: 'EventSideScroller',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
    },
    {
      name: 'events',
      type: 'blocks',
      label: 'Events',
      blocks: [EventCard],
    },
  ],
}
