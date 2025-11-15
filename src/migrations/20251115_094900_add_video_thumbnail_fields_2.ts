import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Add videoThumbnailFilename text field to media table
  await db.execute(sql`
    ALTER TABLE "media" 
    ADD COLUMN "video_thumbnail_filename" varchar;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" 
    DROP COLUMN IF EXISTS "video_thumbnail_filename";
  `)
}
