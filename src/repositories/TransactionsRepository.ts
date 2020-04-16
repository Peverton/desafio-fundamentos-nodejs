import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Array<Transaction>;

  constructor() {
    this.transactions = [];
  }

  public all(): Array<Transaction> {
    return this.transactions;
  }

  private getSum(type: string): number {
    return this.transactions.reduce((sum, el) => {
      if (el.type === type) {
        return sum + el.value;
      }
      return sum;
    }, 0);
  }

  public getBalance(): Balance {
    const income = this.getSum('income');
    const outcome = this.getSum('outcome');
    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
