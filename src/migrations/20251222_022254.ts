import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  // Copy data from video_cards to standard_card (only common columns)
  await db.execute(sql`
    INSERT INTO "pages_blocks_standard_card" (
      "_order",
      "_parent_id",
      "_path",
      "id",
      "title",
      "description",
      "videos_id",
      "block_name"
    )
    SELECT 
      "_order",
      "_parent_id",
      "_path",
      "id",
      "title",
      "description",
      "videos_id",
      "block_name"
    FROM "pages_blocks_video_cards"
    ON CONFLICT ("id") DO NOTHING;
  `)

  // Copy data from _pages_v_blocks_video_cards to _pages_v_blocks_standard_card
  await db.execute(sql`
    INSERT INTO "_pages_v_blocks_standard_card" (
      "_order",
      "_parent_id",
      "_path",
      "id",
      "title",
      "description",
      "videos_id",
      "_uuid",
      "block_name"
    )
    SELECT 
      "_order",
      "_parent_id",
      "_path",
      "id",
      "title",
      "description",
      "videos_id",
      "_uuid",
      "block_name"
    FROM "_pages_v_blocks_video_cards"
    ON CONFLICT ("id") DO NOTHING;
  `)

  // Drop video_cards tables
  await db.execute(sql`
   DROP TABLE "pages_blocks_video_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_video_cards" CASCADE;
  `)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  // Recreate video_cards tables
  await db.execute(sql`
   CREATE TABLE "pages_blocks_video_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"videos_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"videos_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  `)

  // Copy data back from standard_card to video_cards (only common columns)
  await db.execute(sql`
    INSERT INTO "pages_blocks_video_cards" (
      "_order",
      "_parent_id",
      "_path",
      "id",
      "title",
      "description",
      "videos_id",
      "block_name"
    )
    SELECT 
      "_order",
      "_parent_id",
      "_path",
      "id",
      "title",
      "description",
      "videos_id",
      "block_name"
    FROM "pages_blocks_standard_card"
    ON CONFLICT ("id") DO NOTHING;
  `)

  await db.execute(sql`
    INSERT INTO "_pages_v_blocks_video_cards" (
      "_order",
      "_parent_id",
      "_path",
      "id",
      "title",
      "description",
      "videos_id",
      "_uuid",
      "block_name"
    )
    SELECT 
      "_order",
      "_parent_id",
      "_path",
      "id",
      "title",
      "description",
      "videos_id",
      "_uuid",
      "block_name"
    FROM "_pages_v_blocks_standard_card"
    ON CONFLICT ("id") DO NOTHING;
  `)

  // Add constraints and indexes
  await db.execute(sql`
  ALTER TABLE "pages_blocks_video_cards" ADD CONSTRAINT "pages_blocks_video_cards_videos_id_media_id_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_cards" ADD CONSTRAINT "pages_blocks_video_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_cards" ADD CONSTRAINT "_pages_v_blocks_video_cards_videos_id_media_id_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_cards" ADD CONSTRAINT "_pages_v_blocks_video_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_video_cards_order_idx" ON "pages_blocks_video_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_cards_parent_id_idx" ON "pages_blocks_video_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_cards_path_idx" ON "pages_blocks_video_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_cards_videos_idx" ON "pages_blocks_video_cards" USING btree ("videos_id");
  CREATE INDEX "_pages_v_blocks_video_cards_order_idx" ON "_pages_v_blocks_video_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_cards_parent_id_idx" ON "_pages_v_blocks_video_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_cards_path_idx" ON "_pages_v_blocks_video_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_cards_videos_idx" ON "_pages_v_blocks_video_cards" USING btree ("videos_id");`)
}
