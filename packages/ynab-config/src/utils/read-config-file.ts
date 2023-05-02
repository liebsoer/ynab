import getConfigPath from './get-config-path';
import { existsSync, readFileSync } from 'node:fs';

export default function readConfig<T>(configFileName: string) {
  const path = getConfigPath(configFileName);
  if (existsSync(path)) {
    return JSON.parse(readFileSync(path, { encoding: 'utf-8' })) as T;
  }

  return {} as T;
}
