import { ITransaction } from '@shared/models/transactions.model';

export interface IPouchdbData {
	transactions: ITransaction[];
	secsSinceLast: number;
	secsSinceBegin: number;
	secsSinceLastInterval: any;
	secsSinceBeginInterval: any;
}
