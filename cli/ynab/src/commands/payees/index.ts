import { Args, Command, Flags } from '@oclif/core';
import { createYnabClient } from '@liebsoer/ynab-client';
import { persistPayees, readConfig, PayeesConfig } from '@liebsoer/ynab-config';

export default class Payee extends Command {
  static description = 'describe the command here';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = {};

  static args = {};

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Payee);
    const { pat, budgetId } = readConfig();

    if (!pat) {
      throw new Error('Personal access token not set!');
    }
    if (!budgetId) {
      throw new Error('Budget id not set!');
    }

    const ynabClient = createYnabClient(pat);

    const { data } = await ynabClient.fetchPayees(budgetId);
    const { payees, server_knowledge } = data;

    persistPayees({
      payees,
      server_knowledge,
    } as PayeesConfig);
  }
}
