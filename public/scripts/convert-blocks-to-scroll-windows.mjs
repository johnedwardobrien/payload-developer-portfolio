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

const blocks = [
  {
    blockType: 'scrollWindow',
    items: [
      {
        $oid: '6954a5d5309743c775e794c6',
      },
      {
        $oid: '6954a5d6309743c775e794ca',
      },
    ],
    blocks: [],
    id: '69547f8191b5c96cb40c5de3',
    blockName: 'TopHero + IconBanner',
  },
  {
    blockType: 'scrollWindow',
    items: [
      {
        $oid: '6954a5d6309743c775e794cc',
      },
    ],
    blocks: [],
    id: '6956ce1bc42edd12b5414727',
    blockName: 'VideoSideScroller - Grid',
  },
  {
    blockType: 'scrollWindow',
    items: [
      {
        $oid: '6954a5d6309743c775e794d0',
      },
    ],
    blocks: [],
    id: '6956ce3cc42edd12b5414728',
    blockName: 'VideoSideScroller - Single Grow/Shrink',
  },
  {
    blockType: 'scrollWindow',
    items: [
      {
        $oid: '6954a5d7309743c775e794d4',
      },
    ],
    blocks: [],
    id: '6956ce6fc42edd12b5414729',
    blockName: 'LayeredCards',
  },
  {
    blockType: 'scrollWindow',
    items: [
      {
        $oid: '6954a5d7309743c775e794d7',
      },
    ],
    blocks: [],
    id: '6956cea3c42edd12b541472a',
    blockName: 'VideoSideScroller - Layered',
  },
  {
    blockType: 'scrollWindow',
    items: [
      {
        $oid: '6954a5d7309743c775e794db',
      },
    ],
    blocks: [],
    id: '6956cebdc42edd12b541472b',
    blockName: 'EventSideScroller',
  },
  {
    blockType: 'scrollWindow',
    items: [
      {
        $oid: '6956d2d791ab31ed2e93f40b',
      },
    ],
    blocks: [],
    id: '6956ced5c42edd12b541472c',
    blockName: 'ThreeCardWBg',
  },
  {
    blockType: 'scrollWindow',
    items: [
      {
        $oid: '6954a5d8309743c775e794e2',
      },
    ],
    blocks: [],
    id: '6956d3682d4d68cc21fa5c0f',
    blockName: 'ClickSlider',
  },
  {
    blockType: 'scrollWindow',
    items: [
      {
        $oid: '6954a5d8309743c775e794e5',
      },
    ],
    blocks: [],
    id: '6956d3772d4d68cc21fa5c10',
    blockName: 'CTAButtons',
  },
]

/**
 * Migration script to convert YachtParallax blocks to ScrollWindow collection items
 *
 * This script:
 * 1. Finds all pages with yachtParallax blocks in their layout
 * 2. For each yachtParallax block, extracts the blocks array
 * 3. Creates ScrollWindow collection items from those blocks
 * 4. Updates the yachtParallax block to reference the new ScrollWindow items
 */

// Helper function to convert MongoDB $oid format to string ID
function convertOid(value) {
  if (!value) return value
  if (typeof value === 'object' && value.$oid) {
    return value.$oid
  }
  if (typeof value === 'string') {
    return value
  }
  return value
}

async function migrate() {
  try {
    console.log('Initializing Payload...')
    const payload = await getPayload({ config })

    // Step 1: Create ScrollWindow collection items from hardcoded blocks
    console.log(`\nCreating ${blocks.length} ScrollWindow items from hardcoded blocks...\n`)

    const scrollWindowMap = new Map() // Map block ID to ScrollWindow ID
    let totalScrollWindowsCreated = 0

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i]

      if (block.blockType !== 'scrollWindow') {
        console.log(`  Skipping block ${i + 1}: not a scrollWindow block`)
        continue
      }

      const title = block.blockName || `Scroll Window ${i + 1}`
      const itemIds = (block.items || []).map((item) => convertOid(item)).filter(Boolean)

      console.log(`  Creating ScrollWindow ${i + 1}/${blocks.length}: ${title}`)
      console.log(`    Items: ${itemIds.length} YachtParallaxItem IDs`)

      try {
        const scrollWindow = await payload.create({
          collection: 'scroll-window',
          data: {
            title,
            items: itemIds,
          },
          context: {
            disableRevalidate: true,
          },
        })

        scrollWindowMap.set(block.id, scrollWindow.id)
        totalScrollWindowsCreated++
        console.log(`    ✓ Created ScrollWindow: ${scrollWindow.id} (${title})`)
      } catch (error) {
        console.error(`    ✗ Error creating ScrollWindow for block ${i + 1}:`, error.message)
      }
    }

    console.log(`\n✓ Created ${totalScrollWindowsCreated} ScrollWindow items\n`)

    // Step 2: Find pages with yachtParallax blocks and update them
    console.log('Finding all pages with yachtParallax blocks...')
    const { docs: allPages } = await payload.find({
      collection: 'pages',
      limit: 1000,
      depth: 2, // Need depth to get nested blocks
    })

    // Filter pages that have yachtParallax blocks in their layout
    const pages = allPages.filter((page) => {
      if (!page.layout || !Array.isArray(page.layout)) return false
      return page.layout.some((block) => block.blockType === 'yachtParallax')
    })

    console.log(
      `Found ${pages.length} pages with yachtParallax blocks (out of ${allPages.length} total pages)\n`,
    )

    if (pages.length === 0) {
      console.log('No pages with yachtParallax blocks found. Skipping page updates.')
    } else {
      let totalPagesUpdated = 0

      for (const page of pages) {
        console.log(`\nProcessing page: ${page.title || page.id} (${page.slug || 'no slug'})`)

        if (!page.layout || !Array.isArray(page.layout)) {
          console.log('  Skipping: No layout found')
          continue
        }

        // Find yachtParallax blocks in the layout
        const yachtParallaxBlocks = page.layout.filter(
          (block) => block.blockType === 'yachtParallax',
        )

        if (yachtParallaxBlocks.length === 0) {
          console.log('  Skipping: No yachtParallax blocks found in layout')
          continue
        }

        const updatedLayout = [...page.layout]
        let pageNeedsUpdate = false

        for (const yachtParallaxBlock of yachtParallaxBlocks) {
          console.log(`  Processing yachtParallax block (ID: ${yachtParallaxBlock.id || 'no id'})`)

          // Get the blocks array from the yachtParallax block
          const oldBlocks = yachtParallaxBlock.blocks || []

          if (oldBlocks.length === 0) {
            console.log('    No blocks found in yachtParallax block, skipping')
            continue
          }

          console.log(`    Found ${oldBlocks.length} blocks to convert`)

          // Map old block IDs to new ScrollWindow IDs
          const scrollWindowIds = []

          for (const oldBlock of oldBlocks) {
            if (oldBlock.blockType === 'scrollWindow' && oldBlock.id) {
              const scrollWindowId = scrollWindowMap.get(oldBlock.id)
              if (scrollWindowId) {
                scrollWindowIds.push(scrollWindowId)
                console.log(`    ✓ Mapped block ${oldBlock.id} to ScrollWindow ${scrollWindowId}`)
              } else {
                console.warn(`    ⚠ Could not find ScrollWindow for block ID: ${oldBlock.id}`)
              }
            }
          }

          // Update the yachtParallax block in the layout to use relationship field
          const yachtParallaxIndex = updatedLayout.findIndex(
            (block) => block.blockType === 'yachtParallax' && block.id === yachtParallaxBlock.id,
          )

          if (yachtParallaxIndex !== -1 && scrollWindowIds.length > 0) {
            updatedLayout[yachtParallaxIndex] = {
              ...updatedLayout[yachtParallaxIndex],
              scrollWindows: scrollWindowIds,
              // Remove the old blocks field
              blocks: undefined,
            }
            pageNeedsUpdate = true
            console.log(
              `    ✓ Updated yachtParallax block to reference ${scrollWindowIds.length} ScrollWindow items`,
            )
          }
        }

        // Update the page if needed
        if (pageNeedsUpdate) {
          try {
            await payload.update({
              collection: 'pages',
              id: page.id,
              data: {
                layout: updatedLayout,
              },
              context: {
                disableRevalidate: true,
              },
            })
            totalPagesUpdated++
            console.log(`  ✓ Updated page: ${page.title || page.id}`)
          } catch (error) {
            console.error(`  ✗ Error updating page ${page.id}:`, error.message)
          }
        }
      }

      console.log(`\n✓ Updated ${totalPagesUpdated} pages`)
    }

    console.log('\n✅ Migration complete!')
    console.log(`  ScrollWindows created: ${totalScrollWindowsCreated}`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

migrate()
