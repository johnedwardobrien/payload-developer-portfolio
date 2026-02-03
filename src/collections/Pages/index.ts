import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { AnimationBlock } from '../../blocks/AnimationBlock/config'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { SideTabPanel } from '../../blocks/SideTabPanel/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { ChatWindow } from '../../blocks/ChatWindow/config'
import { ContentChat } from '../../blocks/ContentChat/config'
import { YachtParallax } from '../../blocks/YachtParallax/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                AnimationBlock,
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                SideTabPanel,
                ChatWindow,
                ContentChat,
                YachtParallax,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
        {
          label: 'Settings',
          fields: [
            {
              name: 'header',
              type: 'select',
              label: 'Header',
              options: [
                {
                  label: 'Main Header',
                  value: 'main',
                },
                {
                  label: 'Chat Header',
                  value: 'chat',
                },
                {
                  label: 'Empty',
                  value: 'empty',
                },
              ],
              defaultValue: 'main',
            },
            {
              name: 'footer',
              type: 'select',
              label: 'Footer',
              options: [
                {
                  label: 'Main Footer',
                  value: 'main',
                },
                {
                  label: 'Chat Footer',
                  value: 'chat',
                },
                {
                  label: 'Empty',
                  value: 'empty',
                },
              ],
              defaultValue: 'main',
            },
            {
              name: 'theme',
              type: 'select',
              label: 'Theme',
              options: [
                {
                  label: 'None',
                  value: 'none',
                },
                {
                  label: 'Chat Window',
                  value: 'chat-window',
                },
                {
                  label: 'Yacht Bazaar',
                  value: 'yacht-bazaar',
                },
              ],
            },
            {
              name: 'favicon',
              type: 'select',
              label: 'Favicon',
              options: [
                {
                  label: 'None',
                  value: 'none',
                },
                {
                  label: 'Code',
                  value: 'code.ico',
                },
              ],
              defaultValue: 'none',
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
