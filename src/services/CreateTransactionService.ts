import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {
    if ( !this.transactionsRepository.typeValid(type) ) {
      throw Error('This type is invalid');
    }

    const balance = this.transactionsRepository.getBalance();
    if ( type === 'outcome' && balance.total < value ) {
      throw Error('Insufficient funds for this operation');
    }

    const transaction = this.transactionsRepository.create({title, value, type});

    return transaction;
  }
}

export default CreateTransactionService;
