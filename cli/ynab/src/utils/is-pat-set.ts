import { readConfig } from '@liebsoer/ynab-config';

export default function isPatSet() {
  const config = readConfig();

  return typeof config.pat === 'string' && config.pat.length > 0;
}
