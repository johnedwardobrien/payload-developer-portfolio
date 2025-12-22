import * as migration_20251115_094900_add_video_thumbnail_fields from './20251115_094900_add_video_thumbnail_fields';
import * as migration_20251115_094900_add_video_thumbnail_fields_2 from './20251115_094900_add_video_thumbnail_fields_2';
import * as migration_20251120_050201 from './20251120_050201';
import * as migration_20251120_050631 from './20251120_050631';
import * as migration_20251121_020431 from './20251121_020431';
import * as migration_20251220_041204 from './20251220_041204';
import * as migration_20251220_194412 from './20251220_194412';
import * as migration_20251220_212151 from './20251220_212151';
import * as migration_20251221_010216 from './20251221_010216';
import * as migration_20251221_033029 from './20251221_033029';
import * as migration_20251221_033320 from './20251221_033320';
import * as migration_20251221_033418 from './20251221_033418';
import * as migration_20251221_194155 from './20251221_194155';
import * as migration_20251221_214000 from './20251221_214000';
import * as migration_20251221_215525 from './20251221_215525';
import * as migration_20251222_000235 from './20251222_000235';

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
    name: '20251220_041204',
  },
  {
    up: migration_20251220_194412.up,
    down: migration_20251220_194412.down,
    name: '20251220_194412',
  },
  {
    up: migration_20251220_212151.up,
    down: migration_20251220_212151.down,
    name: '20251220_212151',
  },
  {
    up: migration_20251221_010216.up,
    down: migration_20251221_010216.down,
    name: '20251221_010216',
  },
  {
    up: migration_20251221_033029.up,
    down: migration_20251221_033029.down,
    name: '20251221_033029',
  },
  {
    up: migration_20251221_033320.up,
    down: migration_20251221_033320.down,
    name: '20251221_033320',
  },
  {
    up: migration_20251221_033418.up,
    down: migration_20251221_033418.down,
    name: '20251221_033418',
  },
  {
    up: migration_20251221_194155.up,
    down: migration_20251221_194155.down,
    name: '20251221_194155',
  },
  {
    up: migration_20251221_214000.up,
    down: migration_20251221_214000.down,
    name: '20251221_214000',
  },
  {
    up: migration_20251221_215525.up,
    down: migration_20251221_215525.down,
    name: '20251221_215525',
  },
  {
    up: migration_20251222_000235.up,
    down: migration_20251222_000235.down,
    name: '20251222_000235'
  },
];
