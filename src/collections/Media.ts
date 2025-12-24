import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    listSearchableFields: ['filename', 'alt'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: ({ req }) => {
      return {
        isVideoThumbnail: {
          equals: false,
        },
      }
    },
    update: authenticated,
  },
  fields: [
    {
      name: 'videoThumbnail',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        components: {
          Field: '@/components/Custom/Fields/CustomVideoThumbnail#CustomVideoThumbnail',
        },
      },
    },
    {
      name: 'videoThumbnailFilename',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'isVideoThumbnail',
      type: 'checkbox',
      label: 'Is Video Thumbnail',
      defaultValue: false,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  hooks: {
    afterDelete: [
      async ({ doc, req }) => {
        if (doc.videoThumbnail) {
          await req.payload.delete({
            collection: 'media',
            id: doc.videoThumbnail,
          })
        }
      },
    ],
  },
  upload: {
    adminThumbnail: ({ doc }) => {
      if (doc.isVideoThumbnail) {
      }
      if (doc.videoThumbnailFilename) {
        return `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}${doc.prefix}/${doc.videoThumbnailFilename}`
      }
      return `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}${doc.prefix}/${doc.filename}`
    },
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
