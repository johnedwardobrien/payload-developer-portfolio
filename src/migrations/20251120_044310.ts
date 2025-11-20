import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_side_tab_tab_groups_btn_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__side_tab_v_tab_groups_btn_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "side_tab_tab_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"btn_text" varchar,
  	"btn_link_type" "enum_side_tab_tab_groups_btn_link_type" DEFAULT 'reference',
  	"btn_link_new_tab" boolean,
  	"btn_link_url" varchar,
  	"btn_link_label" varchar,
  	"content_body" jsonb
  );
  
  CREATE TABLE "side_tab" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_side_tab_v_tab_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"btn_text" varchar,
  	"btn_link_type" "enum__side_tab_v_tab_groups_btn_link_type" DEFAULT 'reference',
  	"btn_link_new_tab" boolean,
  	"btn_link_url" varchar,
  	"btn_link_label" varchar,
  	"content_body" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_side_tab_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "media" ADD COLUMN "video_thumbnail_id" integer;
  ALTER TABLE "media" ADD COLUMN "video_thumbnail_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "is_video_thumbnail" boolean DEFAULT false;
  ALTER TABLE "side_tab_tab_groups" ADD CONSTRAINT "side_tab_tab_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."side_tab"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "side_tab" ADD CONSTRAINT "side_tab_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_side_tab_v_tab_groups" ADD CONSTRAINT "_side_tab_v_tab_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_side_tab_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_side_tab_v" ADD CONSTRAINT "_side_tab_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "side_tab_tab_groups_order_idx" ON "side_tab_tab_groups" USING btree ("_order");
  CREATE INDEX "side_tab_tab_groups_parent_id_idx" ON "side_tab_tab_groups" USING btree ("_parent_id");
  CREATE INDEX "side_tab_order_idx" ON "side_tab" USING btree ("_order");
  CREATE INDEX "side_tab_parent_id_idx" ON "side_tab" USING btree ("_parent_id");
  CREATE INDEX "side_tab_path_idx" ON "side_tab" USING btree ("_path");
  CREATE INDEX "_side_tab_v_tab_groups_order_idx" ON "_side_tab_v_tab_groups" USING btree ("_order");
  CREATE INDEX "_side_tab_v_tab_groups_parent_id_idx" ON "_side_tab_v_tab_groups" USING btree ("_parent_id");
  CREATE INDEX "_side_tab_v_order_idx" ON "_side_tab_v" USING btree ("_order");
  CREATE INDEX "_side_tab_v_parent_id_idx" ON "_side_tab_v" USING btree ("_parent_id");
  CREATE INDEX "_side_tab_v_path_idx" ON "_side_tab_v" USING btree ("_path");
  ALTER TABLE "media" ADD CONSTRAINT "media_video_thumbnail_id_media_id_fk" FOREIGN KEY ("video_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media_video_thumbnail_idx" ON "media" USING btree ("video_thumbnail_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "side_tab_tab_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "side_tab" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_side_tab_v_tab_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_side_tab_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "side_tab_tab_groups" CASCADE;
  DROP TABLE "side_tab" CASCADE;
  DROP TABLE "_side_tab_v_tab_groups" CASCADE;
  DROP TABLE "_side_tab_v" CASCADE;
  ALTER TABLE "media" DROP CONSTRAINT "media_video_thumbnail_id_media_id_fk";
  
  DROP INDEX "media_video_thumbnail_idx";
  ALTER TABLE "media" DROP COLUMN "video_thumbnail_id";
  ALTER TABLE "media" DROP COLUMN "video_thumbnail_filename";
  ALTER TABLE "media" DROP COLUMN "is_video_thumbnail";
  DROP TYPE "public"."enum_side_tab_tab_groups_btn_link_type";
  DROP TYPE "public"."enum__side_tab_v_tab_groups_btn_link_type";`)
}
