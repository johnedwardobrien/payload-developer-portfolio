import * as migration_20251115_094900_add_video_thumbnail_fields from './20251115_094900_add_video_thumbnail_fields';

export const migrations = [
  {
    up: migration_20251115_094900_add_video_thumbnail_fields.up,
    down: migration_20251115_094900_add_video_thumbnail_fields.down,
    name: '20251115_094900_add_video_thumbnail_fields'
  },
];
