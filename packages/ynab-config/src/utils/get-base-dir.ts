import { userInfo } from 'node:os';
import { resolve } from 'node:path';

export default function getBaseDir() {
  const homeDir = resolve(userInfo().homedir);
  return resolve(homeDir, '.liebsoer', 'ynab');
}
