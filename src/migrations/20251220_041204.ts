import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_animation_block_animation" AS ENUM('cube');
  CREATE TYPE "public"."enum_pages_blocks_animation_block_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_header" AS ENUM('main', 'chat', 'empty');
  CREATE TYPE "public"."enum_pages_footer" AS ENUM('main', 'chat', 'empty');
  CREATE TYPE "public"."enum__pages_v_blocks_animation_block_animation" AS ENUM('cube');
  CREATE TYPE "public"."enum__pages_v_blocks_animation_block_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_version_header" AS ENUM('main', 'chat', 'empty');
  CREATE TYPE "public"."enum__pages_v_version_footer" AS ENUM('main', 'chat', 'empty');
  CREATE TYPE "public"."enum_chat_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_chat_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "pages_blocks_animation_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"animation" "enum_pages_blocks_animation_block_animation" DEFAULT 'cube',
  	"alignment" "enum_pages_blocks_animation_block_alignment" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text_input" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_chat_window" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"help_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_animation_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"animation" "enum__pages_v_blocks_animation_block_animation" DEFAULT 'cube',
  	"alignment" "enum__pages_v_blocks_animation_block_alignment" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text_input" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_chat_window" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"help_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "chat_header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_chat_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "chat_header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "chat_header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "chat_footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_chat_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "chat_footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "chat_footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "pages" ADD COLUMN "header" "enum_pages_header" DEFAULT 'main';
  ALTER TABLE "pages" ADD COLUMN "footer" "enum_pages_footer" DEFAULT 'main';
  ALTER TABLE "_pages_v" ADD COLUMN "version_header" "enum__pages_v_version_header" DEFAULT 'main';
  ALTER TABLE "_pages_v" ADD COLUMN "version_footer" "enum__pages_v_version_footer" DEFAULT 'main';
  ALTER TABLE "pages_blocks_animation_block" ADD CONSTRAINT "pages_blocks_animation_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_placeholder" ADD CONSTRAINT "pages_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_chat_window" ADD CONSTRAINT "pages_blocks_chat_window_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_animation_block" ADD CONSTRAINT "_pages_v_blocks_animation_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_placeholder" ADD CONSTRAINT "_pages_v_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_chat_window" ADD CONSTRAINT "_pages_v_blocks_chat_window_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chat_header_nav_items" ADD CONSTRAINT "chat_header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."chat_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chat_header_rels" ADD CONSTRAINT "chat_header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."chat_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chat_header_rels" ADD CONSTRAINT "chat_header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chat_header_rels" ADD CONSTRAINT "chat_header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chat_footer_nav_items" ADD CONSTRAINT "chat_footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."chat_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chat_footer_rels" ADD CONSTRAINT "chat_footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."chat_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chat_footer_rels" ADD CONSTRAINT "chat_footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chat_footer_rels" ADD CONSTRAINT "chat_footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_animation_block_order_idx" ON "pages_blocks_animation_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_animation_block_parent_id_idx" ON "pages_blocks_animation_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_animation_block_path_idx" ON "pages_blocks_animation_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_placeholder_order_idx" ON "pages_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "pages_blocks_placeholder_parent_id_idx" ON "pages_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_placeholder_path_idx" ON "pages_blocks_placeholder" USING btree ("_path");
  CREATE INDEX "pages_blocks_chat_window_order_idx" ON "pages_blocks_chat_window" USING btree ("_order");
  CREATE INDEX "pages_blocks_chat_window_parent_id_idx" ON "pages_blocks_chat_window" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_chat_window_path_idx" ON "pages_blocks_chat_window" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_animation_block_order_idx" ON "_pages_v_blocks_animation_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_animation_block_parent_id_idx" ON "_pages_v_blocks_animation_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_animation_block_path_idx" ON "_pages_v_blocks_animation_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_placeholder_order_idx" ON "_pages_v_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_placeholder_parent_id_idx" ON "_pages_v_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_placeholder_path_idx" ON "_pages_v_blocks_placeholder" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_chat_window_order_idx" ON "_pages_v_blocks_chat_window" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_chat_window_parent_id_idx" ON "_pages_v_blocks_chat_window" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_chat_window_path_idx" ON "_pages_v_blocks_chat_window" USING btree ("_path");
  CREATE INDEX "chat_header_nav_items_order_idx" ON "chat_header_nav_items" USING btree ("_order");
  CREATE INDEX "chat_header_nav_items_parent_id_idx" ON "chat_header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "chat_header_rels_order_idx" ON "chat_header_rels" USING btree ("order");
  CREATE INDEX "chat_header_rels_parent_idx" ON "chat_header_rels" USING btree ("parent_id");
  CREATE INDEX "chat_header_rels_path_idx" ON "chat_header_rels" USING btree ("path");
  CREATE INDEX "chat_header_rels_pages_id_idx" ON "chat_header_rels" USING btree ("pages_id");
  CREATE INDEX "chat_header_rels_posts_id_idx" ON "chat_header_rels" USING btree ("posts_id");
  CREATE INDEX "chat_footer_nav_items_order_idx" ON "chat_footer_nav_items" USING btree ("_order");
  CREATE INDEX "chat_footer_nav_items_parent_id_idx" ON "chat_footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX "chat_footer_rels_order_idx" ON "chat_footer_rels" USING btree ("order");
  CREATE INDEX "chat_footer_rels_parent_idx" ON "chat_footer_rels" USING btree ("parent_id");
  CREATE INDEX "chat_footer_rels_path_idx" ON "chat_footer_rels" USING btree ("path");
  CREATE INDEX "chat_footer_rels_pages_id_idx" ON "chat_footer_rels" USING btree ("pages_id");
  CREATE INDEX "chat_footer_rels_posts_id_idx" ON "chat_footer_rels" USING btree ("posts_id");
  ALTER TABLE "pages" DROP COLUMN "page_layout";
  ALTER TABLE "_pages_v" DROP COLUMN "version_page_layout";
  DROP TYPE "public"."enum_pages_page_layout";
  DROP TYPE "public"."enum__pages_v_version_page_layout";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_page_layout" AS ENUM('full', 'empty');
  CREATE TYPE "public"."enum__pages_v_version_page_layout" AS ENUM('full', 'empty');
  DROP TABLE "pages_blocks_animation_block" CASCADE;
  DROP TABLE "pages_blocks_placeholder" CASCADE;
  DROP TABLE "pages_blocks_chat_window" CASCADE;
  DROP TABLE "_pages_v_blocks_animation_block" CASCADE;
  DROP TABLE "_pages_v_blocks_placeholder" CASCADE;
  DROP TABLE "_pages_v_blocks_chat_window" CASCADE;
  DROP TABLE "chat_header_nav_items" CASCADE;
  DROP TABLE "chat_header" CASCADE;
  DROP TABLE "chat_header_rels" CASCADE;
  DROP TABLE "chat_footer_nav_items" CASCADE;
  DROP TABLE "chat_footer" CASCADE;
  DROP TABLE "chat_footer_rels" CASCADE;
  ALTER TABLE "pages" ADD COLUMN "page_layout" "enum_pages_page_layout" DEFAULT 'full';
  ALTER TABLE "_pages_v" ADD COLUMN "version_page_layout" "enum__pages_v_version_page_layout" DEFAULT 'full';
  ALTER TABLE "pages" DROP COLUMN "header";
  ALTER TABLE "pages" DROP COLUMN "footer";
  ALTER TABLE "_pages_v" DROP COLUMN "version_header";
  ALTER TABLE "_pages_v" DROP COLUMN "version_footer";
  DROP TYPE "public"."enum_pages_blocks_animation_block_animation";
  DROP TYPE "public"."enum_pages_blocks_animation_block_alignment";
  DROP TYPE "public"."enum_pages_header";
  DROP TYPE "public"."enum_pages_footer";
  DROP TYPE "public"."enum__pages_v_blocks_animation_block_animation";
  DROP TYPE "public"."enum__pages_v_blocks_animation_block_alignment";
  DROP TYPE "public"."enum__pages_v_version_header";
  DROP TYPE "public"."enum__pages_v_version_footer";
  DROP TYPE "public"."enum_chat_header_nav_items_link_type";
  DROP TYPE "public"."enum_chat_footer_nav_items_link_type";`)
}
