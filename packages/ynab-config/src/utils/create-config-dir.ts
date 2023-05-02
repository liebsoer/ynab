import { mkdirSync } from 'node:fs';
import getBaseDir from './get-base-dir';

export default function createConfigDir() {
  mkdirSync(getBaseDir(), { recursive: true });
}
