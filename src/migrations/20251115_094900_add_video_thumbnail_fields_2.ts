import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Add videoThumbnail relationship field to media table
  await db.execute(sql`
    ALTER TABLE "media" 
    ADD COLUMN "video_thumbnail_id" integer;
  `)

  // Add videoThumbnailFilename text field to media table
  await db.execute(sql`
    ALTER TABLE "media" 
    ADD COLUMN "video_thumbnail_filename" varchar;
  `)

  // Add isVideoThumbnail boolean field to media table with default false
  await db.execute(sql`
    ALTER TABLE "media" 
    ADD COLUMN "is_video_thumbnail" boolean DEFAULT false;
  `)

  // Add foreign key constraint for video_thumbnail_id referencing media.id
  await db.execute(sql`
    ALTER TABLE "media" 
    ADD CONSTRAINT "media_video_thumbnail_id_media_id_fk" 
    FOREIGN KEY ("video_thumbnail_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Remove foreign key constraint first
  await db.execute(sql`
    ALTER TABLE "media" 
    DROP CONSTRAINT IF EXISTS "media_video_thumbnail_id_media_id_fk";
  `)

  // Remove the added columns
  await db.execute(sql`
    ALTER TABLE "media" 
    DROP COLUMN IF EXISTS "video_thumbnail_id";
  `)

  await db.execute(sql`
    ALTER TABLE "media" 
    DROP COLUMN IF EXISTS "video_thumbnail_filename";
  `)

  await db.execute(sql`
    ALTER TABLE "media" 
    DROP COLUMN IF EXISTS "is_video_thumbnail";
  `)
}
