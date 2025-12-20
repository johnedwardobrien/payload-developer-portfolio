import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_chat_window" ADD COLUMN "pinecone_index" varchar;
  ALTER TABLE "pages_blocks_chat_window" ADD COLUMN "prompt_context" varchar;
  ALTER TABLE "pages_blocks_chat_window" ADD COLUMN "prompt_instructions" varchar;
  ALTER TABLE "_pages_v_blocks_chat_window" ADD COLUMN "pinecone_index" varchar;
  ALTER TABLE "_pages_v_blocks_chat_window" ADD COLUMN "prompt_context" varchar;
  ALTER TABLE "_pages_v_blocks_chat_window" ADD COLUMN "prompt_instructions" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_chat_window" DROP COLUMN "pinecone_index";
  ALTER TABLE "pages_blocks_chat_window" DROP COLUMN "prompt_context";
  ALTER TABLE "pages_blocks_chat_window" DROP COLUMN "prompt_instructions";
  ALTER TABLE "_pages_v_blocks_chat_window" DROP COLUMN "pinecone_index";
  ALTER TABLE "_pages_v_blocks_chat_window" DROP COLUMN "prompt_context";
  ALTER TABLE "_pages_v_blocks_chat_window" DROP COLUMN "prompt_instructions";`)
}
