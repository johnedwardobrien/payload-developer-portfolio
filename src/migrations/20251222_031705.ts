import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  // Fix undefined blockType values in nested blocks
  // This fixes blocks in threeCardAcrossWithBackground.cards that have undefined blockType
  // Fix in yacht_parallax collection
  await db.execute(sql`
    UPDATE "yacht_parallax"
    SET "blocks" = (
      SELECT jsonb_agg(
        CASE 
          WHEN block->>'blockType' = 'threeCardAcrossWithBackground' AND block->'cards' IS NOT NULL THEN
            jsonb_set(
              block,
              '{cards}',
              (
                SELECT jsonb_agg(
                  CASE 
                    WHEN card->>'blockType' IS NULL OR card->>'blockType' = 'null' OR card->>'blockType' = '' THEN
                      jsonb_set(card, '{blockType}', '"threeCard"')
                    ELSE card
                  END
                )
                FROM jsonb_array_elements(block->'cards') AS card
              )
            )
          ELSE block
        END
      )
      FROM jsonb_array_elements("blocks") AS block
    )
    WHERE EXISTS (
      SELECT 1
      FROM jsonb_array_elements("blocks") AS block
      WHERE block->>'blockType' = 'threeCardAcrossWithBackground'
        AND EXISTS (
          SELECT 1
          FROM jsonb_array_elements(block->'cards') AS card
          WHERE card->>'blockType' IS NULL OR card->>'blockType' = 'null' OR card->>'blockType' = ''
        )
    );
  `)

  // Fix in pages collection layout blocks (yachtParallax blocks)
  await db.execute(sql`
    UPDATE "pages"
    SET "layout" = (
      SELECT jsonb_agg(
        CASE 
          WHEN block->>'blockType' = 'yachtParallax' AND block->'blocks' IS NOT NULL THEN
            jsonb_set(
              block,
              '{blocks}',
              (
                SELECT jsonb_agg(
                  CASE 
                    WHEN nested_block->>'blockType' = 'threeCardAcrossWithBackground' AND nested_block->'cards' IS NOT NULL THEN
                      jsonb_set(
                        nested_block,
                        '{cards}',
                        (
                          SELECT jsonb_agg(
                            CASE 
                              WHEN card->>'blockType' IS NULL OR card->>'blockType' = 'null' OR card->>'blockType' = '' THEN
                                jsonb_set(card, '{blockType}', '"threeCard"')
                              ELSE card
                            END
                          )
                          FROM jsonb_array_elements(nested_block->'cards') AS card
                        )
                      )
                    ELSE nested_block
                  END
                )
                FROM jsonb_array_elements(block->'blocks') AS nested_block
              )
            )
          ELSE block
        END
      )
      FROM jsonb_array_elements("layout") AS block
    )
    WHERE EXISTS (
      SELECT 1
      FROM jsonb_array_elements("layout") AS block
      WHERE block->>'blockType' = 'yachtParallax'
        AND EXISTS (
          SELECT 1
          FROM jsonb_array_elements(block->'blocks') AS nested_block
          WHERE nested_block->>'blockType' = 'threeCardAcrossWithBackground'
            AND EXISTS (
              SELECT 1
              FROM jsonb_array_elements(nested_block->'cards') AS card
              WHERE card->>'blockType' IS NULL OR card->>'blockType' = 'null' OR card->>'blockType' = ''
            )
        )
    );
  `)
}

export async function down({
  db: _db,
  payload: _payload,
  req: _req,
}: MigrateDownArgs): Promise<void> {
  // This migration fixes data, so there's nothing to reverse
  // The data fix is idempotent and safe to run multiple times
}
