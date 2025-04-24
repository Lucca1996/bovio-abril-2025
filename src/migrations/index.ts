import * as migration_20250424_180333 from './20250424_180333';

export const migrations = [
  {
    up: migration_20250424_180333.up,
    down: migration_20250424_180333.down,
    name: '20250424_180333'
  },
];
