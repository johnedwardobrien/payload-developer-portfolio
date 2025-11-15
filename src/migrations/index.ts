import * as migration_20251115_080551 from './20251115_080551';

export const migrations = [
  {
    up: migration_20251115_080551.up,
    down: migration_20251115_080551.down,
    name: '20251115_080551'
  },
];
