import createConfigDir from './create-config-dir';
import { writeFileSync } from 'node:fs';
import getConfigPath from './get-config-path';

export default function persistConfigFile(
  configFileName: string,
  config: unknown
) {
  createConfigDir();
  writeFileSync(getConfigPath(configFileName), JSON.stringify(config, null, 2));
}
