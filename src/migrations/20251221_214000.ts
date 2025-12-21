import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_top_hero_with_icons" DROP CONSTRAINT "pages_blocks_top_hero_with_icons_icons_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_top_hero_with_icons" DROP CONSTRAINT "_pages_v_blocks_top_hero_with_icons_icons_id_media_id_fk";
  
  DROP INDEX "pages_blocks_top_hero_with_icons_icons_idx";
  DROP INDEX "_pages_v_blocks_top_hero_with_icons_icons_idx";
  ALTER TABLE "pages_blocks_top_hero_with_icons" DROP COLUMN "icons_id";
  ALTER TABLE "_pages_v_blocks_top_hero_with_icons" DROP COLUMN "icons_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_top_hero_with_icons" ADD COLUMN "icons_id" integer;
  ALTER TABLE "_pages_v_blocks_top_hero_with_icons" ADD COLUMN "icons_id" integer;
  ALTER TABLE "pages_blocks_top_hero_with_icons" ADD CONSTRAINT "pages_blocks_top_hero_with_icons_icons_id_media_id_fk" FOREIGN KEY ("icons_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_top_hero_with_icons" ADD CONSTRAINT "_pages_v_blocks_top_hero_with_icons_icons_id_media_id_fk" FOREIGN KEY ("icons_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_top_hero_with_icons_icons_idx" ON "pages_blocks_top_hero_with_icons" USING btree ("icons_id");
  CREATE INDEX "_pages_v_blocks_top_hero_with_icons_icons_idx" ON "_pages_v_blocks_top_hero_with_icons" USING btree ("icons_id");`)
}
