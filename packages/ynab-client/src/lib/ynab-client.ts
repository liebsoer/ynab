import { API } from 'ynab';

export function createYnabClient(accessToken: string) {
  const { budgets, categories, payees } = new API(accessToken);

  return {
    fetchBudgets: () => budgets.getBudgets(),
    fetchBudget: (budgetId: string) => budgets.getBudgetById(budgetId),
    fetchCategories: (budgetId: string) => categories.getCategories(budgetId),
    fetchCategory: (budget_id: string, category_id: string) =>
      categories.getCategoryById(budget_id, category_id),
    fetchPayees: (budgetId: string) => payees.getPayees(budgetId),
    fetchPayee: (budgetId: string, payeeId: string) =>
      payees.getPayeeById(budgetId, payeeId),
  };
}
