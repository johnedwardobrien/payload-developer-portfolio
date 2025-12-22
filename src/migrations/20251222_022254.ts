import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  // Rename tables from video_cards to standard_card
  await db.execute(sql`
   ALTER TABLE "pages_blocks_video_cards" RENAME TO "pages_blocks_standard_card";
  ALTER TABLE "_pages_v_blocks_video_cards" RENAME TO "_pages_v_blocks_standard_card";
  `)

  // Rename constraints
  await db.execute(sql`
   ALTER TABLE "pages_blocks_standard_card" RENAME CONSTRAINT "pages_blocks_video_cards_videos_id_media_id_fk" TO "pages_blocks_standard_card_videos_id_media_id_fk";
  ALTER TABLE "pages_blocks_standard_card" RENAME CONSTRAINT "pages_blocks_video_cards_parent_id_fk" TO "pages_blocks_standard_card_parent_id_fk";
  ALTER TABLE "_pages_v_blocks_standard_card" RENAME CONSTRAINT "_pages_v_blocks_video_cards_videos_id_media_id_fk" TO "_pages_v_blocks_standard_card_videos_id_media_id_fk";
  ALTER TABLE "_pages_v_blocks_standard_card" RENAME CONSTRAINT "_pages_v_blocks_video_cards_parent_id_fk" TO "_pages_v_blocks_standard_card_parent_id_fk";
  `)

  // Rename indexes
  await db.execute(sql`
   ALTER INDEX "pages_blocks_video_cards_order_idx" RENAME TO "pages_blocks_standard_card_order_idx";
  ALTER INDEX "pages_blocks_video_cards_parent_id_idx" RENAME TO "pages_blocks_standard_card_parent_id_idx";
  ALTER INDEX "pages_blocks_video_cards_path_idx" RENAME TO "pages_blocks_standard_card_path_idx";
  ALTER INDEX "pages_blocks_video_cards_videos_idx" RENAME TO "pages_blocks_standard_card_videos_idx";
  ALTER INDEX "_pages_v_blocks_video_cards_order_idx" RENAME TO "_pages_v_blocks_standard_card_order_idx";
  ALTER INDEX "_pages_v_blocks_video_cards_parent_id_idx" RENAME TO "_pages_v_blocks_standard_card_parent_id_idx";
  ALTER INDEX "_pages_v_blocks_video_cards_path_idx" RENAME TO "_pages_v_blocks_standard_card_path_idx";
  ALTER INDEX "_pages_v_blocks_video_cards_videos_idx" RENAME TO "_pages_v_blocks_standard_card_videos_idx";
  `)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  // Rename indexes back
  await db.execute(sql`
   ALTER INDEX "pages_blocks_standard_card_order_idx" RENAME TO "pages_blocks_video_cards_order_idx";
  ALTER INDEX "pages_blocks_standard_card_parent_id_idx" RENAME TO "pages_blocks_video_cards_parent_id_idx";
  ALTER INDEX "pages_blocks_standard_card_path_idx" RENAME TO "pages_blocks_video_cards_path_idx";
  ALTER INDEX "pages_blocks_standard_card_videos_idx" RENAME TO "pages_blocks_video_cards_videos_idx";
  ALTER INDEX "_pages_v_blocks_standard_card_order_idx" RENAME TO "_pages_v_blocks_video_cards_order_idx";
  ALTER INDEX "_pages_v_blocks_standard_card_parent_id_idx" RENAME TO "_pages_v_blocks_video_cards_parent_id_idx";
  ALTER INDEX "_pages_v_blocks_standard_card_path_idx" RENAME TO "_pages_v_blocks_video_cards_path_idx";
  ALTER INDEX "_pages_v_blocks_standard_card_videos_idx" RENAME TO "_pages_v_blocks_video_cards_videos_idx";
  `)

  // Rename constraints back
  await db.execute(sql`
   ALTER TABLE "pages_blocks_standard_card" RENAME CONSTRAINT "pages_blocks_standard_card_videos_id_media_id_fk" TO "pages_blocks_video_cards_videos_id_media_id_fk";
  ALTER TABLE "pages_blocks_standard_card" RENAME CONSTRAINT "pages_blocks_standard_card_parent_id_fk" TO "pages_blocks_video_cards_parent_id_fk";
  ALTER TABLE "_pages_v_blocks_standard_card" RENAME CONSTRAINT "_pages_v_blocks_standard_card_videos_id_media_id_fk" TO "_pages_v_blocks_video_cards_videos_id_media_id_fk";
  ALTER TABLE "_pages_v_blocks_standard_card" RENAME CONSTRAINT "_pages_v_blocks_standard_card_parent_id_fk" TO "_pages_v_blocks_video_cards_parent_id_fk";
  `)

  // Rename tables back
  await db.execute(sql`
   ALTER TABLE "pages_blocks_standard_card" RENAME TO "pages_blocks_video_cards";
  ALTER TABLE "_pages_v_blocks_standard_card" RENAME TO "_pages_v_blocks_video_cards";
  `)
}
