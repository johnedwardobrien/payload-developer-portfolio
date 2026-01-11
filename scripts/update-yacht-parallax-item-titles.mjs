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

const blockTypeLabels = {
  topHero: 'Top Hero',
  videoSideScroller: 'Video Side Scroller',
  layeredCards: 'Layered Cards',
  eventSideScroller: 'Event Side Scroller',
  threeCardAcrossWithBackground: 'Three Card Across With Background',
  ctaButtons: 'CTA Buttons',
  clickSlider: 'Click Slider',
  iconBanner: 'Icon Banner',
}

async function migrate() {
  try {
    console.log('Initializing Payload...')
    const payload = await getPayload({ config })

    console.log('Fetching all YachtParallaxItem documents...')
    const result = await payload.find({
      collection: 'yacht-parallax-item',
      limit: 1000,
      depth: 0,
    })

    const items = result.docs || []
    console.log(`Found ${items.length} YachtParallaxItem documents to update`)

    let updatedCount = 0
    let skippedCount = 0

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const blockTypeLabel = blockTypeLabels[item.blockType] || item.blockType

      // Check if title already has the prefix
      const hasPrefix = item.title && item.title.includes(' - ')

      if (!item.title) {
        console.log(`  Skipping item ${i + 1}/${items.length} (ID: ${item.id}) - no title`)
        skippedCount++
        continue
      }

      if (hasPrefix) {
        // Remove existing prefix to get clean title
        const cleanTitle = item.title.split(' - ').slice(1).join(' - ')
        const newTitle = `${blockTypeLabel} - ${cleanTitle}`

        if (item.title === newTitle) {
          console.log(
            `  Skipping item ${i + 1}/${items.length} (ID: ${item.id}) - already has correct format`,
          )
          skippedCount++
          continue
        }

        try {
          await payload.update({
            collection: 'yacht-parallax-item',
            id: item.id,
            data: {
              title: newTitle,
            },
            context: {
              disableRevalidate: true,
            },
          })
          console.log(
            `  ✓ Updated item ${i + 1}/${items.length} (ID: ${item.id}): "${item.title}" → "${newTitle}"`,
          )
          updatedCount++
        } catch (error) {
          console.error(`  ✗ Error updating item ${item.id}:`, error.message)
        }
      } else {
        // Add prefix to title
        const newTitle = `${blockTypeLabel} - ${item.title}`

        try {
          await payload.update({
            collection: 'yacht-parallax-item',
            id: item.id,
            data: {
              title: newTitle,
            },
            context: {
              disableRevalidate: true,
            },
          })
          console.log(
            `  ✓ Updated item ${i + 1}/${items.length} (ID: ${item.id}): "${item.title}" → "${newTitle}"`,
          )
          updatedCount++
        } catch (error) {
          console.error(`  ✗ Error updating item ${item.id}:`, error.message)
        }
      }
    }

    console.log(`\n✅ Migration complete!`)
    console.log(`  Updated: ${updatedCount} documents`)
    console.log(`  Skipped: ${skippedCount} documents`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run the migration
migrate()
