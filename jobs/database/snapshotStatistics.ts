import { path as root } from 'app-root-path';
import Bree from 'bree';

export const snapshotStatistics: Bree.JobOptions[] = [
  {
    name: 'snapshotStatistics',
    interval: '1 day',
    path: `${root}/dist/scripts/insertStatistics.js`,
  },
];
