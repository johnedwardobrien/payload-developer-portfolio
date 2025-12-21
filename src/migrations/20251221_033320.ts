import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "yacht_parallax_blocks_icon_button" DROP COLUMN "icon";
  DROP TYPE "public"."enum_yacht_parallax_blocks_icon_button_icon";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_yacht_parallax_blocks_icon_button_icon" AS ENUM('placeholder');
  ALTER TABLE "yacht_parallax_blocks_icon_button" ADD COLUMN "icon" "enum_yacht_parallax_blocks_icon_button_icon";`)
}
