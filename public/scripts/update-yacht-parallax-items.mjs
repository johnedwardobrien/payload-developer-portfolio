import { getPayload } from 'payload'
import { createRequire } from 'module'
import { pathToFileURL } from 'url'
import { config as dotenvConfig } from 'dotenv'

// Load environment variables from .env file
dotenvConfig()

// Use dynamic import for TypeScript config
const require = createRequire(import.meta.url)
const configPath = pathToFileURL(require.resolve('../src/payload.config.ts')).href
const configModule = await import(configPath)
const config = configModule.default

// Get ObjectId from mongodb package (used by Payload)
const { ObjectId } = require('mongodb')

/**
 * Migration script to create YachtParallaxItem documents from existing YachtParallax blocks
 *
 * This script uses hardcoded blocks data from the version document
 */

// Helper function to convert MongoDB $oid format to validated ObjectId string
// Payload stores relationships as ObjectIds in MongoDB, but accepts string IDs in the API
// We validate the ID is a valid ObjectId, then pass as string for Payload to convert
function convertOid(value) {
  if (!value) return value
  if (typeof value === 'object' && value.$oid) {
    // Validate it's a valid ObjectId, then return as string
    const oid = new ObjectId(value.$oid)
    return oid.toString()
  }
  if (typeof value === 'string' && ObjectId.isValid(value)) {
    // Validate and return as string
    return new ObjectId(value).toString()
  }
  return value
}

// Helper function to convert MongoDB $date format to ISO string
function convertDate(value) {
  if (value && typeof value === 'object' && value.$date) {
    return value.$date
  }
  return value
}

// Helper function to process nested blocks and convert MongoDB formats
function processNestedBlocks(blocks) {
  if (!Array.isArray(blocks)) return blocks

  return blocks.map((block) => {
    const processed = { ...block }

    // Convert backgroundMedia $oid
    if (processed.backgroundMedia) {
      processed.backgroundMedia = convertOid(processed.backgroundMedia)
    }

    // Convert image $oid
    if (processed.image) {
      processed.image = convertOid(processed.image)
    }

    // Convert date $date
    if (processed.date) {
      processed.date = convertDate(processed.date)
    }

    // Convert fromDate and toDate $date
    if (processed.fromDate) {
      processed.fromDate = convertDate(processed.fromDate)
    }
    if (processed.toDate) {
      processed.toDate = convertDate(processed.toDate)
    }

    // Recursively process nested blocks (e.g., standardCards within threeCard)
    if (processed.standardCards) {
      processed.standardCards = processNestedBlocks(processed.standardCards)
    }

    return processed
  })
}

// Helper function to map block data to YachtParallaxItem format
function mapBlockToItem(block) {
  const { blockType, ...blockData } = block

  // Base item structure
  const item = {
    blockType,
  }

  // Map fields based on blockType
  switch (blockType) {
    case 'topHero':
      item.title = blockData.title
      item.subtitle = blockData.subtitle
      item.featuredImageTitle = blockData.featuredImageTitle
      item.featuredImageSubtitle = blockData.featuredImageSubtitle
      item.featuredImageButtonText = blockData.featuredImageButtonText
      item.inputPlaceholders = blockData.inputPlaceholders || []
      item.heroImage = convertOid(blockData.heroImage)
      item.heroFeatured = convertOid(blockData.heroFeatured)
      break

    case 'videoSideScroller':
      item.videoLayout = blockData.videoLayout
      item.title = blockData.title
      item.subtitle = blockData.subtitle
      item.buttonText1 = blockData.buttonText1
      item.buttonText2 = blockData.buttonText2
      item.nextWindowText = blockData.nextWindowText
      item.videos = processNestedBlocks(blockData.videos || [])
      break

    case 'layeredCards':
      item.title = blockData.title
      item.subtitle = blockData.subtitle
      item.buttonText = blockData.buttonText
      item.cards = processNestedBlocks(blockData.cards || [])
      break

    case 'eventSideScroller':
      item.title = blockData.title
      item.buttonText = blockData.buttonText
      item.events = processNestedBlocks(blockData.events || [])
      break

    case 'threeCardAcrossWithBackground':
      item.title = 'Three Card Across' // Temporary title for migration
      item.threeCards = processNestedBlocks(blockData.threeCards || [])
      break

    case 'ctaButtons':
      item.title = blockData.title
      item.backgroundImage = convertOid(blockData.backgroundImage)
      item.iconButtons = blockData.iconButtons || []
      break

    case 'clickSlider':
      item.title = blockData.title
      item.buttonText = blockData.buttonText
      item.cards = processNestedBlocks(blockData.cards || [])
      break

    case 'iconBanner':
      item.title = blockData.title
      item.subtitle = blockData.subtitle
      item.icons = blockData.icons || []
      break

    case 'scrollWindow':
      // Skip scrollWindow blocks for now as they don't have fields in YachtParallaxItem
      return null

    default:
      console.warn(`Unknown blockType: ${blockType}`)
      return null
  }

  return item
}

async function migrate() {
  try {
    console.log('Initializing Payload...')
    const payload = await getPayload({ config })

    // Delete only existing threeCardAcrossWithBackground YachtParallaxItem documents
    console.log('Deleting existing threeCardAcrossWithBackground YachtParallaxItem documents...')
    const existingItems = await payload.find({
      collection: 'yacht-parallax-item',
      where: {
        blockType: {
          equals: 'threeCardAcrossWithBackground',
        },
      },
      limit: 10000,
      depth: 0,
    })

    if (existingItems.docs && existingItems.docs.length > 0) {
      console.log(
        `Found ${existingItems.docs.length} existing threeCardAcrossWithBackground documents to delete`,
      )
      for (const item of existingItems.docs) {
        try {
          await payload.delete({
            collection: 'yacht-parallax-item',
            id: item.id,
            context: {
              disableRevalidate: true,
            },
          })
        } catch (error) {
          console.error(`  ✗ Error deleting item ${item.id}:`, error.message)
        }
      }
      console.log(
        `✓ Deleted ${existingItems.docs.length} existing threeCardAcrossWithBackground documents\n`,
      )
    } else {
      console.log('No existing threeCardAcrossWithBackground documents to delete\n')
    }

    console.log('Using hardcoded layout data from version document...')

    // Use the hardcoded layout data provided
    const layout = [
      {
        blockType: 'yachtParallax',
        blocks: [
          {
            blockType: 'topHero',
            title: 'Where Every Journey Finds Its Vessel',
            subtitle: "The world's trusted yacht market",
            featuredImageTitle: "Early access to the market's most anticipated listings.",
            featuredImageSubtitle: 'The Private Collection',
            featuredImageButtonText: 'Get details',
            inputPlaceholders: [],
            heroImage: {
              $oid: '694b4e476c570aeb78f17fa9',
            },
            heroFeatured: {
              $oid: '694b52476c570aeb78f18083',
            },
            id: '694c71a09d83544963c1ee75',
          },
          {
            blockType: 'iconBanner',
            title: 'A Year Upon the Water',
            subtitle: 'Navigate the changing tides with our curated seasonal guides.',
            icons: [
              {
                blockType: 'iconButton',
                title: 'Spring',
                icon: 'spring',
                id: '694c972771976ffa9c0c2faa',
                blockName: 'Spring',
              },
              {
                blockType: 'iconButton',
                title: 'Summer',
                icon: 'summer',
                id: '694c973f71976ffa9c0c2fac',
                blockName: 'Summer',
              },
              {
                blockType: 'iconButton',
                title: 'Autumn',
                icon: 'autumn',
                id: '694c974171976ffa9c0c2fad',
                blockName: 'Autumn',
              },
              {
                blockType: 'iconButton',
                title: 'Winter',
                icon: 'winter',
                id: '694c974471976ffa9c0c2fae',
                blockName: 'Winter',
              },
            ],
            id: '694c94db87f4ce45c23ea7b4',
          },
          {
            blockType: 'videoSideScroller',
            videoLayout: 'grid',
            title: 'Chart Your Course',
            subtitle: 'Explore the fleet by lifestyle, hull type, or intended destination.',
            nextWindowText: 'Personalize your yacht buying experience',
            videos: [
              {
                blockType: 'standardCard',
                title: 'Blue Water Legends',
                backgroundMedia: {
                  $oid: '694b51a46c570aeb78f1804f',
                },
                id: '694c987c71976ffa9c0c2fb0',
              },
              {
                blockType: 'standardCard',
                title: 'Coastal Day-Sailors',
                backgroundMedia: {
                  $oid: '694b51556c570aeb78f18030',
                },
                id: '694c988671976ffa9c0c2fb1',
              },
              {
                blockType: 'standardCard',
                title: 'Modern Multihulls',
                backgroundMedia: {
                  $oid: '694b51146c570aeb78f18027',
                },
                id: '694c988871976ffa9c0c2fb2',
              },
              {
                blockType: 'standardCard',
                title: 'The Expedition Fleet',
                backgroundMedia: {
                  $oid: '694b50d96c570aeb78f1801e',
                },
                id: '694c988a71976ffa9c0c2fb3',
              },
              {
                blockType: 'standardCard',
                title: 'Classic Wood & Brightwork',
                backgroundMedia: {
                  $oid: '694b4eb76c570aeb78f17fc4',
                },
                id: '694c988b71976ffa9c0c2fb4',
              },
              {
                blockType: 'standardCard',
                title: 'Racing Thoroughbreds',
                backgroundMedia: {
                  $oid: '694b4f816c570aeb78f17ff1',
                },
                id: '694c988d71976ffa9c0c2fb5',
              },
              {
                blockType: 'standardCard',
                title: 'Solar & Hybrid Pioneers',
                backgroundMedia: {
                  $oid: '694b4ca06c570aeb78f17f61',
                },
                id: '694c989171976ffa9c0c2fb6',
              },
              {
                blockType: 'standardCard',
                title: "The Weekender's Choice",
                backgroundMedia: {
                  $oid: '694b4d2f6c570aeb78f17f73',
                },
                id: '694c989271976ffa9c0c2fb7',
              },
              {
                blockType: 'standardCard',
                title: 'Pocket Cruisers',
                backgroundMedia: {
                  $oid: '694b4e1b6c570aeb78f17fa0',
                },
                id: '694c989471976ffa9c0c2fb8',
              },
              {
                blockType: 'standardCard',
                title: 'Luxury Superyachts',
                backgroundMedia: {
                  $oid: '694b4fee6c570aeb78f18015',
                },
                id: '694c989771976ffa9c0c2fb9',
              },
              {
                blockType: 'standardCard',
                title: 'Turnkey Live-aboards',
                backgroundMedia: {
                  $oid: '694b4d0b6c570aeb78f17f6a',
                },
                id: '694c989971976ffa9c0c2fba',
              },
              {
                blockType: 'standardCard',
                title: 'The Restoration Project',
                backgroundMedia: {
                  $oid: '694b489bda1fce6ecb3d9fb1',
                },
                id: '694c989d71976ffa9c0c2fbb',
              },
              {
                blockType: 'standardCard',
                title: 'Family Cruising Yachts',
                backgroundMedia: {
                  $oid: '694b3f02da14e1f5a6670a27',
                },
                id: '694c98a071976ffa9c0c2fbc',
              },
              {
                blockType: 'standardCard',
                title: 'High-Performance Trimarans',
                backgroundMedia: {
                  $oid: '694b4d9b6c570aeb78f17f85',
                },
                id: '694c98a571976ffa9c0c2fbd',
              },
            ],
            id: '694c97a771976ffa9c0c2faf',
            blockName: 'Grid',
          },
          {
            blockType: 'videoSideScroller',
            videoLayout: 'singleGrowShrink',
            title: "The Captain's Quarters",
            buttonText1: 'View Inventory',
            videos: [
              {
                blockType: 'standardCard',
                title: 'Nautical Heritage',
                backgroundMedia: {
                  $oid: '694b4f816c570aeb78f17ff1',
                },
                id: '694c9fab71976ffa9c0c2fc1',
              },
              {
                blockType: 'standardCard',
                title: 'The Yacht Club Circuit',
                backgroundMedia: {
                  $oid: '694b4eda6c570aeb78f17fcd',
                },
                id: '694c9faf71976ffa9c0c2fc2',
              },
              {
                blockType: 'standardCard',
                title: 'Marine Conservation',
                backgroundMedia: {
                  $oid: '694b4eb76c570aeb78f17fc4',
                },
                id: '694c9fb371976ffa9c0c2fc3',
              },
              {
                blockType: 'standardCard',
                title: 'Maritime Art & Photography',
                backgroundMedia: {
                  $oid: '694b4d716c570aeb78f17f7c',
                },
                id: '694c9fb571976ffa9c0c2fc4',
              },
              {
                blockType: 'standardCard',
                title: "The Sailor's Bookshelf",
                backgroundMedia: {
                  $oid: '694b4e016c570aeb78f17f97',
                },
                id: '694c9fb871976ffa9c0c2fc5',
              },
              {
                blockType: 'standardCard',
                title: 'Traditional Craftsmanship',
                backgroundMedia: {
                  $oid: '694b4f816c570aeb78f17ff1',
                },
                id: '694c9fba71976ffa9c0c2fc6',
              },
            ],
            id: '694c9f3371976ffa9c0c2fc0',
          },
          {
            blockType: 'layeredCards',
            title: 'Route & Reach',
            subtitle: '',
            buttonText: 'Explore all itineraries',
            cards: [
              {
                blockType: 'standardCard',
                title: 'The Coastal Escape',
                subtitle: '2 Days',
                buttonText: 'See itinerary',
                backgroundMedia: {
                  $oid: '694b522b6c570aeb78f1806f',
                },
                id: '694ca13071976ffa9c0c2fc8',
              },
              {
                blockType: 'standardCard',
                title: 'The Ocean Crossing',
                subtitle: '30 Days',
                buttonText: 'See itinerary',
                backgroundMedia: {
                  $oid: '694b52476c570aeb78f18083',
                },
                id: '694ca13471976ffa9c0c2fc9',
              },
              {
                blockType: 'standardCard',
                title: 'The Island Hopper',
                subtitle: '6 Days',
                buttonText: 'See itinerary',
                backgroundMedia: {
                  $oid: '694b52626c570aeb78f18092',
                },
                id: '694ca13871976ffa9c0c2fca',
              },
            ],
            id: '694ca0dd71976ffa9c0c2fc7',
          },
          {
            blockType: 'videoSideScroller',
            videoLayout: 'layeredCards',
            title: 'The Marketplace on the Water',
            buttonText1: 'Discover',
            buttonText2: 'Visit Site',
            videos: [
              {
                blockType: 'standardCard',
                title: 'Global Premieres',
                subtitle: '',
                description:
                  'Be among the first to step aboard the latest flagship releases and innovative designs as they debut on the world stage.',
                backgroundMedia: {
                  $oid: '694b4fa26c570aeb78f17ffa',
                },
                id: '694ca49e71976ffa9c0c2fcf',
              },
              {
                blockType: 'standardCard',
                title: 'The Brokerage Circuit',
                description:
                  'Navigate a curated selection of high-quality, pre-owned vessels available for immediate acquisition and sea trials.',
                backgroundMedia: {
                  $oid: '694b3f02da14e1f5a6670a27',
                },
                id: '694ca4a371976ffa9c0c2fd0',
              },
              {
                blockType: 'standardCard',
                title: 'Private Viewings',
                description:
                  'Gain exclusive, off-market access to the most prestigious yachts through invitation-only showcases and elite shipyard tours.',
                backgroundMedia: {
                  $oid: '694b4f366c570aeb78f17fdf',
                },
                id: '694ca4a671976ffa9c0c2fd1',
              },
              {
                blockType: 'standardCard',
                title: 'Tenders & Toys Expos',
                description:
                  'Discover the essential secondary fleet, from high-speed luxury tenders to the latest in deep-sea exploration equipment.',
                backgroundMedia: {
                  $oid: '694b4f086c570aeb78f17fd6',
                },
                id: '694ca4a971976ffa9c0c2fd2',
              },
            ],
            id: '694ca38971976ffa9c0c2fce',
          },
          {
            blockType: 'eventSideScroller',
            title: 'Where the Fleet Gathers',
            buttonText: 'Explore events',
            events: [
              {
                blockType: 'eventCard',
                title: 'The Starting Line',
                fromDate: {
                  $date: '2026-01-02T12:00:00.000Z',
                },
                toDate: {
                  $date: '2026-01-04T12:00:00.000Z',
                },
                linkText: 'Get details',
                image: {
                  $oid: '694b52476c570aeb78f18083',
                },
                id: '694ca82f71976ffa9c0c2fd4',
              },
              {
                blockType: 'eventCard',
                title: 'Masterclass Sessions',
                fromDate: {
                  $date: '2026-01-09T12:00:00.000Z',
                },
                toDate: {
                  $date: '2026-01-11T12:00:00.000Z',
                },
                linkText: 'Get details',
                image: {
                  $oid: '694b52786c570aeb78f1809c',
                },
                id: '694ca83571976ffa9c0c2fd5',
              },
              {
                blockType: 'eventCard',
                title: 'Dockside Socials',
                fromDate: {
                  $date: '2026-01-16T12:00:00.000Z',
                },
                toDate: {
                  $date: '2026-01-18T12:00:00.000Z',
                },
                linkText: 'Get details',
                image: {
                  $oid: '694b52626c570aeb78f18092',
                },
                id: '694ca83871976ffa9c0c2fd6',
              },
              {
                blockType: 'eventCard',
                title: "The Collector's Gala",
                fromDate: {
                  $date: '2026-01-23T12:00:00.000Z',
                },
                toDate: {
                  $date: '2026-01-25T12:00:00.000Z',
                },
                linkText: 'Get details',
                image: {
                  $oid: '694b52316c570aeb78f18074',
                },
                id: '694ca83b71976ffa9c0c2fd7',
              },
              {
                blockType: 'eventCard',
                title: 'Adventure Rallies',
                fromDate: {
                  $date: '2026-02-06T12:00:00.000Z',
                },
                toDate: {
                  $date: '2026-02-08T12:00:00.000Z',
                },
                linkText: 'Get details',
                image: {
                  $oid: '694b522b6c570aeb78f1806f',
                },
                id: '694ca83d71976ffa9c0c2fd8',
              },
              {
                blockType: 'eventCard',
                title: 'The Gear Expo',
                fromDate: {
                  $date: '2026-02-13T12:00:00.000Z',
                },
                toDate: {
                  $date: '2026-02-15T12:00:00.000Z',
                },
                linkText: 'Get details',
                image: {
                  $oid: '694b52066c570aeb78f18060',
                },
                id: '694ca84071976ffa9c0c2fd9',
              },
            ],
            id: '694ca78c71976ffa9c0c2fd3',
          },
          {
            blockType: 'threeCardAcrossWithBackground',
            threeCards: [
              {
                blockType: 'threeCard',
                title: 'The New Build Registry',
                subtitle: 'Secure your shipyard queue and customize from the hull up.',
                backgroundMedia: {
                  $oid: '694b4e8b6c570aeb78f17fbb',
                },
                standardCards: [
                  {
                    blockType: 'standardCard',
                    title: 'Custom Superyachts',
                    buttonText: 'More info',
                    backgroundMedia: {
                      $oid: '694b52506c570aeb78f18088',
                    },
                    id: '694cab0771976ffa9c0c2fde',
                  },
                  {
                    blockType: 'standardCard',
                    title: 'Production Series',
                    buttonText: 'More info',
                    backgroundMedia: {
                      $oid: '694b528c6c570aeb78f180a6',
                    },
                    id: '694cab0c71976ffa9c0c2fdf',
                  },
                  {
                    blockType: 'standardCard',
                    title: 'Next-Gen Propulsion',
                    buttonText: 'More info',
                    backgroundMedia: {
                      $oid: '694b51fd6c570aeb78f1805b',
                    },
                    id: '694cab0e71976ffa9c0c2fe0',
                  },
                ],
                id: '694ca9a471976ffa9c0c2fdb',
              },
              {
                blockType: 'threeCard',
                title: 'The Brokerage Collection',
                subtitle: 'Elite pre-owned vessels ready for immediate sea trials.',
                backgroundMedia: {
                  $oid: '694b4eda6c570aeb78f17fcd',
                },
                standardCards: [
                  {
                    blockType: 'standardCard',
                    title: 'Turnkey Cruisers',
                    buttonText: 'More info',
                    backgroundMedia: {
                      $oid: '694b526e6c570aeb78f18097',
                    },
                    id: '694cab2871976ffa9c0c2fe4',
                  },
                  {
                    blockType: 'standardCard',
                    title: 'Classic Restorations',
                    buttonText: 'More info',
                    backgroundMedia: {
                      $oid: '694b52066c570aeb78f18060',
                    },
                    id: '694cab2871976ffa9c0c2fe5',
                  },
                  {
                    blockType: 'standardCard',
                    title: 'Proven Charter Fleet',
                    buttonText: 'More info',
                    backgroundMedia: {
                      $oid: '694b52626c570aeb78f18092',
                    },
                    id: '694cab2871976ffa9c0c2fe6',
                  },
                ],
                id: '694cab2871976ffa9c0c2fe3',
              },
            ],
            id: '694ca94f71976ffa9c0c2fda',
          },
          {
            blockType: 'clickSlider',
            title: "The Mariner's Academy",
            buttonText: 'Read the blog',
            cards: [
              {
                blockType: 'standardCard',
                title: 'The Physics of Docking: Mastery in Tight Quarters',
                subtitle: 'Seamanship Essentials',
                buttonText: 'Read more',
                date: {
                  $date: '2025-12-17T12:00:00.000Z',
                },
                backgroundMedia: {
                  $oid: '694b51f56c570aeb78f18056',
                },
                id: '694cadbb71976ffa9c0c2fec',
              },
              {
                blockType: 'standardCard',
                title: 'Decoding the GRIB: Predicting Local Microclimates',
                subtitle: 'Weather & Routing',
                buttonText: 'Read more',
                date: {
                  $date: '2025-12-14T12:00:00.000Z',
                },
                backgroundMedia: {
                  $oid: '694b52786c570aeb78f1809c',
                },
                id: '694cadd871976ffa9c0c2fed',
              },
              {
                blockType: 'standardCard',
                title: 'The Preventative Checklist: Beyond the Oil Change',
                subtitle: 'The Engine Room',
                buttonText: 'Read more',
                date: {
                  $date: '2025-12-12T12:00:00.000Z',
                },
                backgroundMedia: {
                  $oid: '694b52816c570aeb78f180a1',
                },
                id: '694caddb71976ffa9c0c2fee',
              },
            ],
            id: '694cad7c71976ffa9c0c2feb',
          },
          {
            blockType: 'ctaButtons',
            title: 'Your Command Center',
            iconButtons: [
              {
                blockType: 'iconButton',
                title: 'Anchor',
                icon: 'anchor',
                id: '694cafb371976ffa9c0c2ff1',
              },
              {
                blockType: 'iconButton',
                title: 'Ship',
                icon: 'ship',
                id: '694cafc271976ffa9c0c2ff2',
              },
              {
                blockType: 'iconButton',
                title: 'Compass',
                icon: 'compass',
                id: '694cafc471976ffa9c0c2ff3',
              },
              {
                blockType: 'iconButton',
                title: 'Life Ring',
                icon: 'lifeRing',
                id: '694cafc671976ffa9c0c2ff4',
              },
              {
                blockType: 'iconButton',
                title: 'Water Waves',
                icon: 'waterWaves',
                id: '694cafc971976ffa9c0c2ff5',
              },
              {
                blockType: 'iconButton',
                title: 'Binocular',
                icon: 'binoculars',
                id: '694cafcb71976ffa9c0c2ff6',
              },
            ],
            id: '694caf7771976ffa9c0c2ff0',
          },
          {
            blockType: 'scrollWindow',
            blocks: [],
            id: '69547f8191b5c96cb40c5de3',
          },
        ],
        id: '694b664f913c3ca0fcb41abb',
      },
    ]

    const yachtParallaxBlock = layout.find((block) => block?.blockType === 'yachtParallax')

    if (!yachtParallaxBlock) {
      throw new Error('No yachtParallax block found in layout')
    }

    const blocks = yachtParallaxBlock.blocks || []
    console.log(`Found ${blocks.length} blocks to migrate`)

    // Create YachtParallaxItem for each block
    const createdItems = []

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i]

      // Only process threeCardAcrossWithBackground blocks
      if (block.blockType !== 'threeCardAcrossWithBackground') {
        console.log(`\nSkipping block ${i + 1}/${blocks.length}: ${block.blockType}`)
        continue
      }

      console.log(`\nProcessing block ${i + 1}/${blocks.length}: ${block.blockType}`)

      const itemData = mapBlockToItem(block)

      if (!itemData) {
        console.log(`  Skipping ${block.blockType} (not supported or empty)`)
        continue
      }

      try {
        const createdItem = await payload.create({
          collection: 'yacht-parallax-item',
          data: itemData,
          context: {
            disableRevalidate: true,
          },
        })

        createdItems.push(createdItem)
        console.log(`  ✓ Created YachtParallaxItem with ID: ${createdItem.id}`)
      } catch (error) {
        console.error(`  ✗ Error creating item for ${block.blockType}:`, error.message)
      }
    }

    console.log(
      `\n✅ Migration complete! Created ${createdItems.length} YachtParallaxItem documents`,
    )
    console.log(`Created item IDs:`, createdItems.map((item) => item.id).join(', '))

    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run the migration
migrate()
