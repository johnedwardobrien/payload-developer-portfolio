import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_three_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"background_media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_three_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"background_media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_three_card_across_with_background" DROP CONSTRAINT "pages_blocks_three_card_across_with_background_main_background_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_three_card_across_with_background" DROP CONSTRAINT "_pages_v_blocks_three_card_across_with_background_main_background_id_media_id_fk";
  
  DROP INDEX "pages_blocks_three_card_across_with_background_main_back_idx";
  DROP INDEX "_pages_v_blocks_three_card_across_with_background_main_b_idx";
  ALTER TABLE "pages_blocks_three_card" ADD CONSTRAINT "pages_blocks_three_card_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_three_card" ADD CONSTRAINT "pages_blocks_three_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_three_card" ADD CONSTRAINT "_pages_v_blocks_three_card_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_three_card" ADD CONSTRAINT "_pages_v_blocks_three_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_three_card_order_idx" ON "pages_blocks_three_card" USING btree ("_order");
  CREATE INDEX "pages_blocks_three_card_parent_id_idx" ON "pages_blocks_three_card" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_three_card_path_idx" ON "pages_blocks_three_card" USING btree ("_path");
  CREATE INDEX "pages_blocks_three_card_background_media_idx" ON "pages_blocks_three_card" USING btree ("background_media_id");
  CREATE INDEX "_pages_v_blocks_three_card_order_idx" ON "_pages_v_blocks_three_card" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_three_card_parent_id_idx" ON "_pages_v_blocks_three_card" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_three_card_path_idx" ON "_pages_v_blocks_three_card" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_three_card_background_media_idx" ON "_pages_v_blocks_three_card" USING btree ("background_media_id");
  ALTER TABLE "pages_blocks_three_card_across_with_background" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_three_card_across_with_background" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_three_card_across_with_background" DROP COLUMN "main_background_id";
  ALTER TABLE "_pages_v_blocks_three_card_across_with_background" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_three_card_across_with_background" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_three_card_across_with_background" DROP COLUMN "main_background_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_three_card" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_three_card" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_three_card" CASCADE;
  DROP TABLE "_pages_v_blocks_three_card" CASCADE;
  ALTER TABLE "pages_blocks_three_card_across_with_background" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_three_card_across_with_background" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "pages_blocks_three_card_across_with_background" ADD COLUMN "main_background_id" integer;
  ALTER TABLE "_pages_v_blocks_three_card_across_with_background" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_three_card_across_with_background" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "_pages_v_blocks_three_card_across_with_background" ADD COLUMN "main_background_id" integer;
  ALTER TABLE "pages_blocks_three_card_across_with_background" ADD CONSTRAINT "pages_blocks_three_card_across_with_background_main_background_id_media_id_fk" FOREIGN KEY ("main_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_three_card_across_with_background" ADD CONSTRAINT "_pages_v_blocks_three_card_across_with_background_main_background_id_media_id_fk" FOREIGN KEY ("main_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_three_card_across_with_background_main_back_idx" ON "pages_blocks_three_card_across_with_background" USING btree ("main_background_id");
  CREATE INDEX "_pages_v_blocks_three_card_across_with_background_main_b_idx" ON "_pages_v_blocks_three_card_across_with_background" USING btree ("main_background_id");`)
}
