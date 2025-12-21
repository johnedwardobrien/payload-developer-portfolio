import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_video_side_scroller_video_layout" AS ENUM('grid', 'singleGrowShrink', 'layeredCards');
  CREATE TYPE "public"."enum_pages_blocks_icon_button_icon" AS ENUM('placeholder');
  CREATE TYPE "public"."enum__pages_v_blocks_video_side_scroller_video_layout" AS ENUM('grid', 'singleGrowShrink', 'layeredCards');
  CREATE TYPE "public"."enum__pages_v_blocks_icon_button_icon" AS ENUM('placeholder');
  CREATE TABLE "pages_blocks_top_hero_with_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"featured_image_button_text" varchar,
  	"hero_image_id" integer,
  	"hero_featured_id" integer,
  	"icons_id" integer,
  	"block_name" varchar
  );
  
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
  
  CREATE TABLE "pages_blocks_video_side_scroller" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_layout" "enum_pages_blocks_video_side_scroller_video_layout",
  	"title" varchar,
  	"subtitle" varchar,
  	"button_text1" varchar,
  	"button_text2" varchar,
  	"next_window_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_layered_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"button_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_layered_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"button_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_event_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"from_date" timestamp(3) with time zone,
  	"to_date" timestamp(3) with time zone,
  	"link_text" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_event_side_scroller" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"button_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_three_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"button_text" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_three_card_across_with_background" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"main_background_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_icon_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"icon" "enum_pages_blocks_icon_button_icon",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_yacht_parallax" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_top_hero_with_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"featured_image_button_text" varchar,
  	"hero_image_id" integer,
  	"hero_featured_id" integer,
  	"icons_id" integer,
  	"_uuid" varchar,
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
  
  CREATE TABLE "_pages_v_blocks_video_side_scroller" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_layout" "enum__pages_v_blocks_video_side_scroller_video_layout",
  	"title" varchar,
  	"subtitle" varchar,
  	"button_text1" varchar,
  	"button_text2" varchar,
  	"next_window_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_layered_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"button_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_layered_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"button_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_event_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"from_date" timestamp(3) with time zone,
  	"to_date" timestamp(3) with time zone,
  	"link_text" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_event_side_scroller" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"button_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_three_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"button_text" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_three_card_across_with_background" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"main_background_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_icon_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"icon" "enum__pages_v_blocks_icon_button_icon",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_yacht_parallax" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "yacht_parallax_blocks_placeholder" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "yacht_parallax_blocks_top_hero_with_icons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "yacht_parallax_blocks_video_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "yacht_parallax_blocks_video_side_scroller" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "yacht_parallax_blocks_layered_card" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "yacht_parallax_blocks_layered_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "yacht_parallax_blocks_event_card" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "yacht_parallax_blocks_event_side_scroller" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "yacht_parallax_blocks_three_card" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "yacht_parallax_blocks_three_card_across_with_background" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "yacht_parallax_blocks_icon_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "yacht_parallax_blocks_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "yacht_parallax" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "yacht_parallax_blocks_placeholder" CASCADE;
  DROP TABLE "yacht_parallax_blocks_top_hero_with_icons" CASCADE;
  DROP TABLE "yacht_parallax_blocks_video_cards" CASCADE;
  DROP TABLE "yacht_parallax_blocks_video_side_scroller" CASCADE;
  DROP TABLE "yacht_parallax_blocks_layered_card" CASCADE;
  DROP TABLE "yacht_parallax_blocks_layered_cards" CASCADE;
  DROP TABLE "yacht_parallax_blocks_event_card" CASCADE;
  DROP TABLE "yacht_parallax_blocks_event_side_scroller" CASCADE;
  DROP TABLE "yacht_parallax_blocks_three_card" CASCADE;
  DROP TABLE "yacht_parallax_blocks_three_card_across_with_background" CASCADE;
  DROP TABLE "yacht_parallax_blocks_icon_button" CASCADE;
  DROP TABLE "yacht_parallax_blocks_cta_buttons" CASCADE;
  DROP TABLE "yacht_parallax" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_yacht_parallax_fk";
  
  DROP INDEX "payload_locked_documents_rels_yacht_parallax_id_idx";
  ALTER TABLE "pages_blocks_top_hero_with_icons" ADD CONSTRAINT "pages_blocks_top_hero_with_icons_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_top_hero_with_icons" ADD CONSTRAINT "pages_blocks_top_hero_with_icons_hero_featured_id_media_id_fk" FOREIGN KEY ("hero_featured_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_top_hero_with_icons" ADD CONSTRAINT "pages_blocks_top_hero_with_icons_icons_id_media_id_fk" FOREIGN KEY ("icons_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_top_hero_with_icons" ADD CONSTRAINT "pages_blocks_top_hero_with_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_cards" ADD CONSTRAINT "pages_blocks_video_cards_videos_id_media_id_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_cards" ADD CONSTRAINT "pages_blocks_video_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_side_scroller" ADD CONSTRAINT "pages_blocks_video_side_scroller_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_layered_card" ADD CONSTRAINT "pages_blocks_layered_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_layered_cards" ADD CONSTRAINT "pages_blocks_layered_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_event_card" ADD CONSTRAINT "pages_blocks_event_card_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_event_card" ADD CONSTRAINT "pages_blocks_event_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_event_side_scroller" ADD CONSTRAINT "pages_blocks_event_side_scroller_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_three_card" ADD CONSTRAINT "pages_blocks_three_card_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_three_card" ADD CONSTRAINT "pages_blocks_three_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_three_card_across_with_background" ADD CONSTRAINT "pages_blocks_three_card_across_with_background_main_background_id_media_id_fk" FOREIGN KEY ("main_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_three_card_across_with_background" ADD CONSTRAINT "pages_blocks_three_card_across_with_background_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_button" ADD CONSTRAINT "pages_blocks_icon_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_buttons" ADD CONSTRAINT "pages_blocks_cta_buttons_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_buttons" ADD CONSTRAINT "pages_blocks_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_yacht_parallax" ADD CONSTRAINT "pages_blocks_yacht_parallax_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_top_hero_with_icons" ADD CONSTRAINT "_pages_v_blocks_top_hero_with_icons_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_top_hero_with_icons" ADD CONSTRAINT "_pages_v_blocks_top_hero_with_icons_hero_featured_id_media_id_fk" FOREIGN KEY ("hero_featured_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_top_hero_with_icons" ADD CONSTRAINT "_pages_v_blocks_top_hero_with_icons_icons_id_media_id_fk" FOREIGN KEY ("icons_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_top_hero_with_icons" ADD CONSTRAINT "_pages_v_blocks_top_hero_with_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_cards" ADD CONSTRAINT "_pages_v_blocks_video_cards_videos_id_media_id_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_cards" ADD CONSTRAINT "_pages_v_blocks_video_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_side_scroller" ADD CONSTRAINT "_pages_v_blocks_video_side_scroller_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_layered_card" ADD CONSTRAINT "_pages_v_blocks_layered_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_layered_cards" ADD CONSTRAINT "_pages_v_blocks_layered_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_event_card" ADD CONSTRAINT "_pages_v_blocks_event_card_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_event_card" ADD CONSTRAINT "_pages_v_blocks_event_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_event_side_scroller" ADD CONSTRAINT "_pages_v_blocks_event_side_scroller_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_three_card" ADD CONSTRAINT "_pages_v_blocks_three_card_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_three_card" ADD CONSTRAINT "_pages_v_blocks_three_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_three_card_across_with_background" ADD CONSTRAINT "_pages_v_blocks_three_card_across_with_background_main_background_id_media_id_fk" FOREIGN KEY ("main_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_three_card_across_with_background" ADD CONSTRAINT "_pages_v_blocks_three_card_across_with_background_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icon_button" ADD CONSTRAINT "_pages_v_blocks_icon_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_buttons" ADD CONSTRAINT "_pages_v_blocks_cta_buttons_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_buttons" ADD CONSTRAINT "_pages_v_blocks_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_yacht_parallax" ADD CONSTRAINT "_pages_v_blocks_yacht_parallax_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_top_hero_with_icons_order_idx" ON "pages_blocks_top_hero_with_icons" USING btree ("_order");
  CREATE INDEX "pages_blocks_top_hero_with_icons_parent_id_idx" ON "pages_blocks_top_hero_with_icons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_top_hero_with_icons_path_idx" ON "pages_blocks_top_hero_with_icons" USING btree ("_path");
  CREATE INDEX "pages_blocks_top_hero_with_icons_hero_image_idx" ON "pages_blocks_top_hero_with_icons" USING btree ("hero_image_id");
  CREATE INDEX "pages_blocks_top_hero_with_icons_hero_featured_idx" ON "pages_blocks_top_hero_with_icons" USING btree ("hero_featured_id");
  CREATE INDEX "pages_blocks_top_hero_with_icons_icons_idx" ON "pages_blocks_top_hero_with_icons" USING btree ("icons_id");
  CREATE INDEX "pages_blocks_video_cards_order_idx" ON "pages_blocks_video_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_cards_parent_id_idx" ON "pages_blocks_video_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_cards_path_idx" ON "pages_blocks_video_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_cards_videos_idx" ON "pages_blocks_video_cards" USING btree ("videos_id");
  CREATE INDEX "pages_blocks_video_side_scroller_order_idx" ON "pages_blocks_video_side_scroller" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_side_scroller_parent_id_idx" ON "pages_blocks_video_side_scroller" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_side_scroller_path_idx" ON "pages_blocks_video_side_scroller" USING btree ("_path");
  CREATE INDEX "pages_blocks_layered_card_order_idx" ON "pages_blocks_layered_card" USING btree ("_order");
  CREATE INDEX "pages_blocks_layered_card_parent_id_idx" ON "pages_blocks_layered_card" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_layered_card_path_idx" ON "pages_blocks_layered_card" USING btree ("_path");
  CREATE INDEX "pages_blocks_layered_cards_order_idx" ON "pages_blocks_layered_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_layered_cards_parent_id_idx" ON "pages_blocks_layered_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_layered_cards_path_idx" ON "pages_blocks_layered_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_event_card_order_idx" ON "pages_blocks_event_card" USING btree ("_order");
  CREATE INDEX "pages_blocks_event_card_parent_id_idx" ON "pages_blocks_event_card" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_event_card_path_idx" ON "pages_blocks_event_card" USING btree ("_path");
  CREATE INDEX "pages_blocks_event_card_image_idx" ON "pages_blocks_event_card" USING btree ("image_id");
  CREATE INDEX "pages_blocks_event_side_scroller_order_idx" ON "pages_blocks_event_side_scroller" USING btree ("_order");
  CREATE INDEX "pages_blocks_event_side_scroller_parent_id_idx" ON "pages_blocks_event_side_scroller" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_event_side_scroller_path_idx" ON "pages_blocks_event_side_scroller" USING btree ("_path");
  CREATE INDEX "pages_blocks_three_card_order_idx" ON "pages_blocks_three_card" USING btree ("_order");
  CREATE INDEX "pages_blocks_three_card_parent_id_idx" ON "pages_blocks_three_card" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_three_card_path_idx" ON "pages_blocks_three_card" USING btree ("_path");
  CREATE INDEX "pages_blocks_three_card_background_image_idx" ON "pages_blocks_three_card" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_three_card_across_with_background_order_idx" ON "pages_blocks_three_card_across_with_background" USING btree ("_order");
  CREATE INDEX "pages_blocks_three_card_across_with_background_parent_id_idx" ON "pages_blocks_three_card_across_with_background" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_three_card_across_with_background_path_idx" ON "pages_blocks_three_card_across_with_background" USING btree ("_path");
  CREATE INDEX "pages_blocks_three_card_across_with_background_main_back_idx" ON "pages_blocks_three_card_across_with_background" USING btree ("main_background_id");
  CREATE INDEX "pages_blocks_icon_button_order_idx" ON "pages_blocks_icon_button" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_button_parent_id_idx" ON "pages_blocks_icon_button" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icon_button_path_idx" ON "pages_blocks_icon_button" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_buttons_order_idx" ON "pages_blocks_cta_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_buttons_parent_id_idx" ON "pages_blocks_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_buttons_path_idx" ON "pages_blocks_cta_buttons" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_buttons_background_image_idx" ON "pages_blocks_cta_buttons" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_yacht_parallax_order_idx" ON "pages_blocks_yacht_parallax" USING btree ("_order");
  CREATE INDEX "pages_blocks_yacht_parallax_parent_id_idx" ON "pages_blocks_yacht_parallax" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_yacht_parallax_path_idx" ON "pages_blocks_yacht_parallax" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_top_hero_with_icons_order_idx" ON "_pages_v_blocks_top_hero_with_icons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_top_hero_with_icons_parent_id_idx" ON "_pages_v_blocks_top_hero_with_icons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_top_hero_with_icons_path_idx" ON "_pages_v_blocks_top_hero_with_icons" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_top_hero_with_icons_hero_image_idx" ON "_pages_v_blocks_top_hero_with_icons" USING btree ("hero_image_id");
  CREATE INDEX "_pages_v_blocks_top_hero_with_icons_hero_featured_idx" ON "_pages_v_blocks_top_hero_with_icons" USING btree ("hero_featured_id");
  CREATE INDEX "_pages_v_blocks_top_hero_with_icons_icons_idx" ON "_pages_v_blocks_top_hero_with_icons" USING btree ("icons_id");
  CREATE INDEX "_pages_v_blocks_video_cards_order_idx" ON "_pages_v_blocks_video_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_cards_parent_id_idx" ON "_pages_v_blocks_video_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_cards_path_idx" ON "_pages_v_blocks_video_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_cards_videos_idx" ON "_pages_v_blocks_video_cards" USING btree ("videos_id");
  CREATE INDEX "_pages_v_blocks_video_side_scroller_order_idx" ON "_pages_v_blocks_video_side_scroller" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_side_scroller_parent_id_idx" ON "_pages_v_blocks_video_side_scroller" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_side_scroller_path_idx" ON "_pages_v_blocks_video_side_scroller" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_layered_card_order_idx" ON "_pages_v_blocks_layered_card" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_layered_card_parent_id_idx" ON "_pages_v_blocks_layered_card" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_layered_card_path_idx" ON "_pages_v_blocks_layered_card" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_layered_cards_order_idx" ON "_pages_v_blocks_layered_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_layered_cards_parent_id_idx" ON "_pages_v_blocks_layered_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_layered_cards_path_idx" ON "_pages_v_blocks_layered_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_event_card_order_idx" ON "_pages_v_blocks_event_card" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_event_card_parent_id_idx" ON "_pages_v_blocks_event_card" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_event_card_path_idx" ON "_pages_v_blocks_event_card" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_event_card_image_idx" ON "_pages_v_blocks_event_card" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_event_side_scroller_order_idx" ON "_pages_v_blocks_event_side_scroller" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_event_side_scroller_parent_id_idx" ON "_pages_v_blocks_event_side_scroller" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_event_side_scroller_path_idx" ON "_pages_v_blocks_event_side_scroller" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_three_card_order_idx" ON "_pages_v_blocks_three_card" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_three_card_parent_id_idx" ON "_pages_v_blocks_three_card" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_three_card_path_idx" ON "_pages_v_blocks_three_card" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_three_card_background_image_idx" ON "_pages_v_blocks_three_card" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_three_card_across_with_background_order_idx" ON "_pages_v_blocks_three_card_across_with_background" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_three_card_across_with_background_parent_id_idx" ON "_pages_v_blocks_three_card_across_with_background" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_three_card_across_with_background_path_idx" ON "_pages_v_blocks_three_card_across_with_background" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_three_card_across_with_background_main_b_idx" ON "_pages_v_blocks_three_card_across_with_background" USING btree ("main_background_id");
  CREATE INDEX "_pages_v_blocks_icon_button_order_idx" ON "_pages_v_blocks_icon_button" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_icon_button_parent_id_idx" ON "_pages_v_blocks_icon_button" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_icon_button_path_idx" ON "_pages_v_blocks_icon_button" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_buttons_order_idx" ON "_pages_v_blocks_cta_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_buttons_parent_id_idx" ON "_pages_v_blocks_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_buttons_path_idx" ON "_pages_v_blocks_cta_buttons" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_buttons_background_image_idx" ON "_pages_v_blocks_cta_buttons" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_yacht_parallax_order_idx" ON "_pages_v_blocks_yacht_parallax" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_yacht_parallax_parent_id_idx" ON "_pages_v_blocks_yacht_parallax" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_yacht_parallax_path_idx" ON "_pages_v_blocks_yacht_parallax" USING btree ("_path");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "yacht_parallax_id";
  DROP TYPE "public"."enum_yacht_parallax_blocks_video_side_scroller_video_layout";
  DROP TYPE "public"."enum_yacht_parallax_blocks_icon_button_icon";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_yacht_parallax_blocks_video_side_scroller_video_layout" AS ENUM('grid', 'singleGrowShrink', 'layeredCards');
  CREATE TYPE "public"."enum_yacht_parallax_blocks_icon_button_icon" AS ENUM('placeholder');
  CREATE TABLE "yacht_parallax_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text_input" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "yacht_parallax_blocks_top_hero_with_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"featured_image_button_text" varchar,
  	"hero_image_id" integer,
  	"hero_featured_id" integer,
  	"icons_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "yacht_parallax_blocks_video_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"videos_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "yacht_parallax_blocks_video_side_scroller" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_layout" "enum_yacht_parallax_blocks_video_side_scroller_video_layout",
  	"title" varchar,
  	"subtitle" varchar,
  	"button_text1" varchar,
  	"button_text2" varchar,
  	"next_window_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "yacht_parallax_blocks_layered_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"button_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "yacht_parallax_blocks_layered_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"button_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "yacht_parallax_blocks_event_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"from_date" timestamp(3) with time zone,
  	"to_date" timestamp(3) with time zone,
  	"link_text" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "yacht_parallax_blocks_event_side_scroller" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"button_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "yacht_parallax_blocks_three_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"button_text" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "yacht_parallax_blocks_three_card_across_with_background" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"main_background_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "yacht_parallax_blocks_icon_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"icon" "enum_yacht_parallax_blocks_icon_button_icon",
  	"block_name" varchar
  );
  
  CREATE TABLE "yacht_parallax_blocks_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "yacht_parallax" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages_blocks_top_hero_with_icons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_video_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_video_side_scroller" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_layered_card" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_layered_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_event_card" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_event_side_scroller" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_three_card" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_three_card_across_with_background" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_icon_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_yacht_parallax" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_top_hero_with_icons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_video_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_video_side_scroller" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_layered_card" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_layered_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_event_card" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_event_side_scroller" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_three_card" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_three_card_across_with_background" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_icon_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_yacht_parallax" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_top_hero_with_icons" CASCADE;
  DROP TABLE "pages_blocks_video_cards" CASCADE;
  DROP TABLE "pages_blocks_video_side_scroller" CASCADE;
  DROP TABLE "pages_blocks_layered_card" CASCADE;
  DROP TABLE "pages_blocks_layered_cards" CASCADE;
  DROP TABLE "pages_blocks_event_card" CASCADE;
  DROP TABLE "pages_blocks_event_side_scroller" CASCADE;
  DROP TABLE "pages_blocks_three_card" CASCADE;
  DROP TABLE "pages_blocks_three_card_across_with_background" CASCADE;
  DROP TABLE "pages_blocks_icon_button" CASCADE;
  DROP TABLE "pages_blocks_cta_buttons" CASCADE;
  DROP TABLE "pages_blocks_yacht_parallax" CASCADE;
  DROP TABLE "_pages_v_blocks_top_hero_with_icons" CASCADE;
  DROP TABLE "_pages_v_blocks_video_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_video_side_scroller" CASCADE;
  DROP TABLE "_pages_v_blocks_layered_card" CASCADE;
  DROP TABLE "_pages_v_blocks_layered_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_event_card" CASCADE;
  DROP TABLE "_pages_v_blocks_event_side_scroller" CASCADE;
  DROP TABLE "_pages_v_blocks_three_card" CASCADE;
  DROP TABLE "_pages_v_blocks_three_card_across_with_background" CASCADE;
  DROP TABLE "_pages_v_blocks_icon_button" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_yacht_parallax" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "yacht_parallax_id" integer;
  ALTER TABLE "yacht_parallax_blocks_placeholder" ADD CONSTRAINT "yacht_parallax_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."yacht_parallax"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "yacht_parallax_blocks_top_hero_with_icons" ADD CONSTRAINT "yacht_parallax_blocks_top_hero_with_icons_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "yacht_parallax_blocks_top_hero_with_icons" ADD CONSTRAINT "yacht_parallax_blocks_top_hero_with_icons_hero_featured_id_media_id_fk" FOREIGN KEY ("hero_featured_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "yacht_parallax_blocks_top_hero_with_icons" ADD CONSTRAINT "yacht_parallax_blocks_top_hero_with_icons_icons_id_media_id_fk" FOREIGN KEY ("icons_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "yacht_parallax_blocks_top_hero_with_icons" ADD CONSTRAINT "yacht_parallax_blocks_top_hero_with_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."yacht_parallax"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "yacht_parallax_blocks_video_cards" ADD CONSTRAINT "yacht_parallax_blocks_video_cards_videos_id_media_id_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "yacht_parallax_blocks_video_cards" ADD CONSTRAINT "yacht_parallax_blocks_video_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."yacht_parallax"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "yacht_parallax_blocks_video_side_scroller" ADD CONSTRAINT "yacht_parallax_blocks_video_side_scroller_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."yacht_parallax"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "yacht_parallax_blocks_layered_card" ADD CONSTRAINT "yacht_parallax_blocks_layered_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."yacht_parallax"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "yacht_parallax_blocks_layered_cards" ADD CONSTRAINT "yacht_parallax_blocks_layered_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."yacht_parallax"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "yacht_parallax_blocks_event_card" ADD CONSTRAINT "yacht_parallax_blocks_event_card_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "yacht_parallax_blocks_event_card" ADD CONSTRAINT "yacht_parallax_blocks_event_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."yacht_parallax"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "yacht_parallax_blocks_event_side_scroller" ADD CONSTRAINT "yacht_parallax_blocks_event_side_scroller_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."yacht_parallax"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "yacht_parallax_blocks_three_card" ADD CONSTRAINT "yacht_parallax_blocks_three_card_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "yacht_parallax_blocks_three_card" ADD CONSTRAINT "yacht_parallax_blocks_three_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."yacht_parallax"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "yacht_parallax_blocks_three_card_across_with_background" ADD CONSTRAINT "yacht_parallax_blocks_three_card_across_with_background_main_background_id_media_id_fk" FOREIGN KEY ("main_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "yacht_parallax_blocks_three_card_across_with_background" ADD CONSTRAINT "yacht_parallax_blocks_three_card_across_with_background_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."yacht_parallax"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "yacht_parallax_blocks_icon_button" ADD CONSTRAINT "yacht_parallax_blocks_icon_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."yacht_parallax"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "yacht_parallax_blocks_cta_buttons" ADD CONSTRAINT "yacht_parallax_blocks_cta_buttons_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "yacht_parallax_blocks_cta_buttons" ADD CONSTRAINT "yacht_parallax_blocks_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."yacht_parallax"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "yacht_parallax_blocks_placeholder_order_idx" ON "yacht_parallax_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "yacht_parallax_blocks_placeholder_parent_id_idx" ON "yacht_parallax_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "yacht_parallax_blocks_placeholder_path_idx" ON "yacht_parallax_blocks_placeholder" USING btree ("_path");
  CREATE INDEX "yacht_parallax_blocks_top_hero_with_icons_order_idx" ON "yacht_parallax_blocks_top_hero_with_icons" USING btree ("_order");
  CREATE INDEX "yacht_parallax_blocks_top_hero_with_icons_parent_id_idx" ON "yacht_parallax_blocks_top_hero_with_icons" USING btree ("_parent_id");
  CREATE INDEX "yacht_parallax_blocks_top_hero_with_icons_path_idx" ON "yacht_parallax_blocks_top_hero_with_icons" USING btree ("_path");
  CREATE INDEX "yacht_parallax_blocks_top_hero_with_icons_hero_image_idx" ON "yacht_parallax_blocks_top_hero_with_icons" USING btree ("hero_image_id");
  CREATE INDEX "yacht_parallax_blocks_top_hero_with_icons_hero_featured_idx" ON "yacht_parallax_blocks_top_hero_with_icons" USING btree ("hero_featured_id");
  CREATE INDEX "yacht_parallax_blocks_top_hero_with_icons_icons_idx" ON "yacht_parallax_blocks_top_hero_with_icons" USING btree ("icons_id");
  CREATE INDEX "yacht_parallax_blocks_video_cards_order_idx" ON "yacht_parallax_blocks_video_cards" USING btree ("_order");
  CREATE INDEX "yacht_parallax_blocks_video_cards_parent_id_idx" ON "yacht_parallax_blocks_video_cards" USING btree ("_parent_id");
  CREATE INDEX "yacht_parallax_blocks_video_cards_path_idx" ON "yacht_parallax_blocks_video_cards" USING btree ("_path");
  CREATE INDEX "yacht_parallax_blocks_video_cards_videos_idx" ON "yacht_parallax_blocks_video_cards" USING btree ("videos_id");
  CREATE INDEX "yacht_parallax_blocks_video_side_scroller_order_idx" ON "yacht_parallax_blocks_video_side_scroller" USING btree ("_order");
  CREATE INDEX "yacht_parallax_blocks_video_side_scroller_parent_id_idx" ON "yacht_parallax_blocks_video_side_scroller" USING btree ("_parent_id");
  CREATE INDEX "yacht_parallax_blocks_video_side_scroller_path_idx" ON "yacht_parallax_blocks_video_side_scroller" USING btree ("_path");
  CREATE INDEX "yacht_parallax_blocks_layered_card_order_idx" ON "yacht_parallax_blocks_layered_card" USING btree ("_order");
  CREATE INDEX "yacht_parallax_blocks_layered_card_parent_id_idx" ON "yacht_parallax_blocks_layered_card" USING btree ("_parent_id");
  CREATE INDEX "yacht_parallax_blocks_layered_card_path_idx" ON "yacht_parallax_blocks_layered_card" USING btree ("_path");
  CREATE INDEX "yacht_parallax_blocks_layered_cards_order_idx" ON "yacht_parallax_blocks_layered_cards" USING btree ("_order");
  CREATE INDEX "yacht_parallax_blocks_layered_cards_parent_id_idx" ON "yacht_parallax_blocks_layered_cards" USING btree ("_parent_id");
  CREATE INDEX "yacht_parallax_blocks_layered_cards_path_idx" ON "yacht_parallax_blocks_layered_cards" USING btree ("_path");
  CREATE INDEX "yacht_parallax_blocks_event_card_order_idx" ON "yacht_parallax_blocks_event_card" USING btree ("_order");
  CREATE INDEX "yacht_parallax_blocks_event_card_parent_id_idx" ON "yacht_parallax_blocks_event_card" USING btree ("_parent_id");
  CREATE INDEX "yacht_parallax_blocks_event_card_path_idx" ON "yacht_parallax_blocks_event_card" USING btree ("_path");
  CREATE INDEX "yacht_parallax_blocks_event_card_image_idx" ON "yacht_parallax_blocks_event_card" USING btree ("image_id");
  CREATE INDEX "yacht_parallax_blocks_event_side_scroller_order_idx" ON "yacht_parallax_blocks_event_side_scroller" USING btree ("_order");
  CREATE INDEX "yacht_parallax_blocks_event_side_scroller_parent_id_idx" ON "yacht_parallax_blocks_event_side_scroller" USING btree ("_parent_id");
  CREATE INDEX "yacht_parallax_blocks_event_side_scroller_path_idx" ON "yacht_parallax_blocks_event_side_scroller" USING btree ("_path");
  CREATE INDEX "yacht_parallax_blocks_three_card_order_idx" ON "yacht_parallax_blocks_three_card" USING btree ("_order");
  CREATE INDEX "yacht_parallax_blocks_three_card_parent_id_idx" ON "yacht_parallax_blocks_three_card" USING btree ("_parent_id");
  CREATE INDEX "yacht_parallax_blocks_three_card_path_idx" ON "yacht_parallax_blocks_three_card" USING btree ("_path");
  CREATE INDEX "yacht_parallax_blocks_three_card_background_image_idx" ON "yacht_parallax_blocks_three_card" USING btree ("background_image_id");
  CREATE INDEX "yacht_parallax_blocks_three_card_across_with_background_order_idx" ON "yacht_parallax_blocks_three_card_across_with_background" USING btree ("_order");
  CREATE INDEX "yacht_parallax_blocks_three_card_across_with_background_parent_id_idx" ON "yacht_parallax_blocks_three_card_across_with_background" USING btree ("_parent_id");
  CREATE INDEX "yacht_parallax_blocks_three_card_across_with_background_path_idx" ON "yacht_parallax_blocks_three_card_across_with_background" USING btree ("_path");
  CREATE INDEX "yacht_parallax_blocks_three_card_across_with_background__idx" ON "yacht_parallax_blocks_three_card_across_with_background" USING btree ("main_background_id");
  CREATE INDEX "yacht_parallax_blocks_icon_button_order_idx" ON "yacht_parallax_blocks_icon_button" USING btree ("_order");
  CREATE INDEX "yacht_parallax_blocks_icon_button_parent_id_idx" ON "yacht_parallax_blocks_icon_button" USING btree ("_parent_id");
  CREATE INDEX "yacht_parallax_blocks_icon_button_path_idx" ON "yacht_parallax_blocks_icon_button" USING btree ("_path");
  CREATE INDEX "yacht_parallax_blocks_cta_buttons_order_idx" ON "yacht_parallax_blocks_cta_buttons" USING btree ("_order");
  CREATE INDEX "yacht_parallax_blocks_cta_buttons_parent_id_idx" ON "yacht_parallax_blocks_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "yacht_parallax_blocks_cta_buttons_path_idx" ON "yacht_parallax_blocks_cta_buttons" USING btree ("_path");
  CREATE INDEX "yacht_parallax_blocks_cta_buttons_background_image_idx" ON "yacht_parallax_blocks_cta_buttons" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "yacht_parallax_slug_idx" ON "yacht_parallax" USING btree ("slug");
  CREATE INDEX "yacht_parallax_updated_at_idx" ON "yacht_parallax" USING btree ("updated_at");
  CREATE INDEX "yacht_parallax_created_at_idx" ON "yacht_parallax" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_yacht_parallax_fk" FOREIGN KEY ("yacht_parallax_id") REFERENCES "public"."yacht_parallax"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_yacht_parallax_id_idx" ON "payload_locked_documents_rels" USING btree ("yacht_parallax_id");
  DROP TYPE "public"."enum_pages_blocks_video_side_scroller_video_layout";
  DROP TYPE "public"."enum_pages_blocks_icon_button_icon";
  DROP TYPE "public"."enum__pages_v_blocks_video_side_scroller_video_layout";
  DROP TYPE "public"."enum__pages_v_blocks_icon_button_icon";`)
}
