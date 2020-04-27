import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface transactionWithBalance {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public typeValid(type: string): boolean {
    const typeValid = ( type === 'income' || type === 'outcome' );

    return typeValid;
  }

  public all(): transactionWithBalance {
    const transactionsWithBalance = {
      transactions: this.transactions,
      balance: this.getBalance(),
    }

    return transactionsWithBalance;
  }

  public getBalance(): Balance {
    const incomes: Transaction[] = [];
    const outcomes: Transaction[] = [];

    this.transactions.map( transaction => {
      if ( transaction.type === 'income' ) {
        incomes.push(transaction)
      } else {
        outcomes.push(transaction)
      }
    } )

    const incomesTotal: number = this.transactions.reduce((total, elemento) => {
      if (elemento.type === 'income')
        return total += (elemento.value);
      else
        return total
    }, 0);

    const outcomesTotal: number = this.transactions.reduce((total, elemento) => {
      if (elemento.type === 'outcome')
        return total += (elemento.value);
      else
        return total
    }, 0);

    const balance = {
      income: incomesTotal,
      outcome: outcomesTotal,
      total: incomesTotal - outcomesTotal,
    }

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
