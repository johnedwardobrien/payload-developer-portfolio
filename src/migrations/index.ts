import * as migration_20251115_094900_add_video_thumbnail_fields from './20251115_094900_add_video_thumbnail_fields';
import * as migration_20251115_094900_add_video_thumbnail_fields_2 from './20251115_094900_add_video_thumbnail_fields_2';
import * as migration_20251120_050201 from './20251120_050201';
import * as migration_20251120_050631 from './20251120_050631';
import * as migration_20251121_020431 from './20251121_020431';
import * as migration_20251220_041204 from './20251220_041204';

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
  {
    up: migration_20251120_050201.up,
    down: migration_20251120_050201.down,
    name: '20251120_050201',
  },
  {
    up: migration_20251120_050631.up,
    down: migration_20251120_050631.down,
    name: '20251120_050631',
  },
  {
    up: migration_20251121_020431.up,
    down: migration_20251121_020431.down,
    name: '20251121_020431',
  },
  {
    up: migration_20251220_041204.up,
    down: migration_20251220_041204.down,
    name: '20251220_041204'
  },
];
