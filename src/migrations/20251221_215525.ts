import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_top_hero_with_icons" ADD COLUMN "featured_image_title" varchar;
  ALTER TABLE "pages_blocks_top_hero_with_icons" ADD COLUMN "featured_image_subtitle" varchar;
  ALTER TABLE "_pages_v_blocks_top_hero_with_icons" ADD COLUMN "featured_image_title" varchar;
  ALTER TABLE "_pages_v_blocks_top_hero_with_icons" ADD COLUMN "featured_image_subtitle" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_top_hero_with_icons" DROP COLUMN "featured_image_title";
  ALTER TABLE "pages_blocks_top_hero_with_icons" DROP COLUMN "featured_image_subtitle";
  ALTER TABLE "_pages_v_blocks_top_hero_with_icons" DROP COLUMN "featured_image_title";
  ALTER TABLE "_pages_v_blocks_top_hero_with_icons" DROP COLUMN "featured_image_subtitle";`)
}
