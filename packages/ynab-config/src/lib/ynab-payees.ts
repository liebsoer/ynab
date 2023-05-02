import { PayeesConfig } from '../models';
import { persistConfigFile, readConfigFile } from '../utils';

const CONFIG_FILE_NAME = 'payees';

export function persistPayees(config: PayeesConfig) {
  persistConfigFile(CONFIG_FILE_NAME, config);
}

export function readPayees() {
  return readConfigFile<PayeesConfig>(CONFIG_FILE_NAME);
}
