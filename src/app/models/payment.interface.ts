import { User } from './user.interface';

export type Root = Payment[];

export interface Payment {
  id: number;
  contractId: number;
  paymentDate: string;
  amount: number;
  amountStr: string;
  userId: string;
  type: string;
  note: string;
  dueDate: string;
  user: User;
}
