import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Copy image_id to background_image_id where background_image_id is NULL
  await db.execute(sql`
    UPDATE "pages_blocks_standard_card"
    SET "background_image_id" = "image_id"
    WHERE "image_id" IS NOT NULL AND "background_image_id" IS NULL;
  `)

  await db.execute(sql`
    UPDATE "_pages_v_blocks_standard_card"
    SET "background_image_id" = "image_id"
    WHERE "image_id" IS NOT NULL AND "background_image_id" IS NULL;
  `)

  // Now drop the image_id column and its constraints
  await db.execute(sql`
   ALTER TABLE "pages_blocks_standard_card" DROP CONSTRAINT "pages_blocks_standard_card_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_standard_card" DROP CONSTRAINT "_pages_v_blocks_standard_card_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_standard_card_image_idx";
  DROP INDEX "_pages_v_blocks_standard_card_image_idx";
  ALTER TABLE "pages_blocks_standard_card" DROP COLUMN "image_id";
  ALTER TABLE "_pages_v_blocks_standard_card" DROP COLUMN "image_id";`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  // Add back the image_id column
  await db.execute(sql`
   ALTER TABLE "pages_blocks_standard_card" ADD COLUMN "image_id" integer;
  ALTER TABLE "_pages_v_blocks_standard_card" ADD COLUMN "image_id" integer;
  `)

  // Copy background_image_id back to image_id where image_id is NULL
  await db.execute(sql`
    UPDATE "pages_blocks_standard_card"
    SET "image_id" = "background_image_id"
    WHERE "background_image_id" IS NOT NULL AND "image_id" IS NULL;
  `)

  await db.execute(sql`
    UPDATE "_pages_v_blocks_standard_card"
    SET "image_id" = "background_image_id"
    WHERE "background_image_id" IS NOT NULL AND "image_id" IS NULL;
  `)

  // Add back constraints and indexes
  await db.execute(sql`
  ALTER TABLE "pages_blocks_standard_card" ADD CONSTRAINT "pages_blocks_standard_card_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_standard_card" ADD CONSTRAINT "_pages_v_blocks_standard_card_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_standard_card_image_idx" ON "pages_blocks_standard_card" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_standard_card_image_idx" ON "_pages_v_blocks_standard_card" USING btree ("image_id");`)
}
