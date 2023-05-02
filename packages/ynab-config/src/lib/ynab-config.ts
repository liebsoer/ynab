import Config from '../models/Config.model';
import { persistConfigFile, readConfigFile } from '../utils';

const CONFIG_FILE_NAME = 'config';

export function persistConfig(config: Config) {
  const existingConfig = readConfig();
  let hasChanged = false;
  if (config.budgetId) {
    hasChanged = true;
    existingConfig.budgetId = config.budgetId;
  }
  if (config.pat) {
    hasChanged = true;
    existingConfig.pat = config.pat;
  }
  if (hasChanged) {
    persistConfigFile(CONFIG_FILE_NAME, config);
  }
}

export function readConfig() {
  return readConfigFile<Config>(CONFIG_FILE_NAME);
}
