import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_theme" AS ENUM('none', 'chat-window', 'yacht-bazaar');
  CREATE TYPE "public"."enum__pages_v_version_theme" AS ENUM('none', 'chat-window', 'yacht-bazaar');
  ALTER TABLE "pages" ADD COLUMN "theme" "enum_pages_theme";
  ALTER TABLE "_pages_v" ADD COLUMN "version_theme" "enum__pages_v_version_theme";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP COLUMN "theme";
  ALTER TABLE "_pages_v" DROP COLUMN "version_theme";
  DROP TYPE "public"."enum_pages_theme";
  DROP TYPE "public"."enum__pages_v_version_theme";`)
}
