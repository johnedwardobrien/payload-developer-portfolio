import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_page_layout" AS ENUM('full', 'empty');
  CREATE TYPE "public"."enum__pages_v_version_page_layout" AS ENUM('full', 'empty');
  ALTER TABLE "pages" ADD COLUMN "page_layout" "enum_pages_page_layout" DEFAULT 'full';
  ALTER TABLE "_pages_v" ADD COLUMN "version_page_layout" "enum__pages_v_version_page_layout" DEFAULT 'full';
  ALTER TABLE "side_tab_tab_groups" DROP COLUMN "content_body";
  ALTER TABLE "_side_tab_v_tab_groups" DROP COLUMN "content_body";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "side_tab_tab_groups" ADD COLUMN "content_body" jsonb;
  ALTER TABLE "_side_tab_v_tab_groups" ADD COLUMN "content_body" jsonb;
  ALTER TABLE "pages" DROP COLUMN "page_layout";
  ALTER TABLE "_pages_v" DROP COLUMN "version_page_layout";
  DROP TYPE "public"."enum_pages_page_layout";
  DROP TYPE "public"."enum__pages_v_version_page_layout";`)
}
