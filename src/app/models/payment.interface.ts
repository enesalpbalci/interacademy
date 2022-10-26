import { User } from "./user.interface"

export type Root = Payment[]

export interface Payment {
  id: number
  contractId: number
  paymentDate: string
  amount: number
  userId: string
  type: string
  note: string
  path: string
  dueDate: string
  user: User
}

