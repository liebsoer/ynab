import { Args, Command, Flags } from '@oclif/core';
import { prompt } from 'enquirer';
import { readConfig, persistConfig } from '@liebsoer/ynab-config';
import { createYnabClient } from '@liebsoer/ynab-client';
import { isPatSet } from '../../utils';
import Budget from '../../models/Budget';

export default class Config extends Command {
  static description = 'describe the command here';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = {
    budget: Flags.boolean({
      char: 'b',
      description: `Select budget context. Requires a personal access token (PAT) [is set: ${isPatSet()}]`,
      dependsOn: isPatSet() ? [] : ['pat'],
    }),
    pat: Flags.string({
      char: 'p',
      description: 'Set the personal access token (PAT) to interact with YNAB.',
    }),
  };

  static args = {
    file: Args.string({ description: 'file to read' }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Config);
    const ynabConfig = readConfig();

    const { budget, pat } = flags;

    if (pat) {
      ynabConfig.pat = pat;
    }

    if (!ynabConfig.pat) {
      throw Error(
        'Now personal access token (PAT) set. Please use -p flag to set PAT.'
      );
    }

    if (budget && ynabConfig.pat) {
      const ynabClient = createYnabClient(ynabConfig.pat);

      const { data } = await ynabClient.fetchBudgets();
      const { budgets } = data as { budgets: Budget[] };

      const answer = await prompt<{ budgetId: string }>({
        type: 'select',
        name: 'budgetId',
        message: 'Select budget context',
        choices: budgets.map((budget) => ({
          name: budget.id,
          value: budget.id,
          message: budget.name,
        })),
      });

      ynabConfig.budgetId = answer.budgetId;

      persistConfig(ynabConfig);
    } else {
      console.log(ynabConfig);
    }
  }
}
