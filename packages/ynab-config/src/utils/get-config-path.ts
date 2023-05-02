import { resolve } from 'node:path';
import getBaseDir from './get-base-dir';

export default function getConfigPath(configFileName: string) {
  return resolve(getBaseDir(), `${configFileName}.json`);
}
