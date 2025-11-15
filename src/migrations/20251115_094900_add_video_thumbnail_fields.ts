import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Add videoThumbnail relationship field to media table (only if it doesn't exist)
  await db.execute(sql`
    DO $$ 
    BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name='media' AND column_name='video_thumbnail_id') THEN
            ALTER TABLE "media" ADD COLUMN "video_thumbnail_id" integer;
            RAISE NOTICE 'Added video_thumbnail_id column';
        ELSE
            RAISE NOTICE 'video_thumbnail_id column already exists';
        END IF;
    END $$;
  `)

  // Add videoThumbnailFilename text field to media table (only if it doesn't exist)
  await db.execute(sql`
    DO $$ 
    BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name='media' AND column_name='video_thumbnail_filename') THEN
            ALTER TABLE "media" ADD COLUMN "video_thumbnail_filename" varchar;
            RAISE NOTICE 'Added video_thumbnail_filename column';
        ELSE
            RAISE NOTICE 'video_thumbnail_filename column already exists';
        END IF;
    END $$;
  `)

  // Add isVideoThumbnail boolean field to media table (only if it doesn't exist)
  await db.execute(sql`
    DO $$ 
    BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name='media' AND column_name='is_video_thumbnail') THEN
            ALTER TABLE "media" ADD COLUMN "is_video_thumbnail" boolean DEFAULT false;
            RAISE NOTICE 'Added is_video_thumbnail column';
        ELSE
            RAISE NOTICE 'is_video_thumbnail column already exists';
        END IF;
    END $$;
  `)

  // Add foreign key constraint (only if it doesn't exist)
  await db.execute(sql`
    DO $$ 
    BEGIN 
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                      WHERE constraint_name='media_video_thumbnail_id_media_id_fk') THEN
            ALTER TABLE "media" 
            ADD CONSTRAINT "media_video_thumbnail_id_media_id_fk" 
            FOREIGN KEY ("video_thumbnail_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
            RAISE NOTICE 'Added foreign key constraint';
        ELSE
            RAISE NOTICE 'Foreign key constraint already exists';
        END IF;
    END $$;
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
