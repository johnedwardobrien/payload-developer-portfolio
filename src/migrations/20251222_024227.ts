import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_three_card_across_with_background" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "_pages_v_blocks_three_card_across_with_background" ADD COLUMN "subtitle" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_three_card_across_with_background" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_three_card_across_with_background" DROP COLUMN "subtitle";`)
}
