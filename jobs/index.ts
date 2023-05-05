import Bree from 'bree';
import { snapshotStatistics } from './database/snapshotStatistics';

async function main() {
  const bree = new Bree({
    jobs: [...snapshotStatistics],
  });

  await bree.start();

  console.log('Jobs started!');
}

main();
