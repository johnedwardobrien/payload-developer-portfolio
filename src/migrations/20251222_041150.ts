import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_click_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"button_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_click_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"button_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_standard_card" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "pages_blocks_standard_card" ADD COLUMN "date" timestamp(3) with time zone;
  ALTER TABLE "_pages_v_blocks_standard_card" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "_pages_v_blocks_standard_card" ADD COLUMN "date" timestamp(3) with time zone;
  ALTER TABLE "pages_blocks_click_slider" ADD CONSTRAINT "pages_blocks_click_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_click_slider" ADD CONSTRAINT "_pages_v_blocks_click_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_click_slider_order_idx" ON "pages_blocks_click_slider" USING btree ("_order");
  CREATE INDEX "pages_blocks_click_slider_parent_id_idx" ON "pages_blocks_click_slider" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_click_slider_path_idx" ON "pages_blocks_click_slider" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_click_slider_order_idx" ON "_pages_v_blocks_click_slider" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_click_slider_parent_id_idx" ON "_pages_v_blocks_click_slider" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_click_slider_path_idx" ON "_pages_v_blocks_click_slider" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_click_slider" CASCADE;
  DROP TABLE "_pages_v_blocks_click_slider" CASCADE;
  ALTER TABLE "pages_blocks_standard_card" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_standard_card" DROP COLUMN "date";
  ALTER TABLE "_pages_v_blocks_standard_card" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_standard_card" DROP COLUMN "date";`)
}
