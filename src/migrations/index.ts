import * as migration_20251115_082323 from './20251115_082323';

export const migrations = [
  {
    up: migration_20251115_082323.up,
    down: migration_20251115_082323.down,
    name: '20251115_082323'
  },
];
