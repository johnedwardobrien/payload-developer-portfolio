import * as migration_20251115_072129 from './20251115_072129';

export const migrations = [
  {
    up: migration_20251115_072129.up,
    down: migration_20251115_072129.down,
    name: '20251115_072129'
  },
];
