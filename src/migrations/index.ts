import * as migration_20251115_094900_add_video_thumbnail_fields from './20251115_094900_add_video_thumbnail_fields';
import * as migration_20251115_094900_add_video_thumbnail_fields_2 from './20251115_094900_add_video_thumbnail_fields_2';

export const migrations = [
  {
    up: migration_20251115_094900_add_video_thumbnail_fields.up,
    down: migration_20251115_094900_add_video_thumbnail_fields.down,
    name: '20251115_094900_add_video_thumbnail_fields',
  },
  {
    up: migration_20251115_094900_add_video_thumbnail_fields_2.up,
    down: migration_20251115_094900_add_video_thumbnail_fields_2.down,
    name: '20251115_094900_add_video_thumbnail_fields_2',
  },
];
