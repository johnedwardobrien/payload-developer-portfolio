import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_yacht_parallax_blocks_icon_button_icon" ADD VALUE 'placeholder';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "yacht_parallax_blocks_icon_button" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_yacht_parallax_blocks_icon_button_icon";
  CREATE TYPE "public"."enum_yacht_parallax_blocks_icon_button_icon" AS ENUM();
  ALTER TABLE "yacht_parallax_blocks_icon_button" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_yacht_parallax_blocks_icon_button_icon" USING "icon"::"public"."enum_yacht_parallax_blocks_icon_button_icon";`)
}
