import { PaymentDuration } from "./payment-duration.interface"
import { Payment } from "./payment.interface"
import { User } from "./user.interface"

export type Root = Contract[]

export interface Contract {
  id: number
  studentId: string
  approverId:string
  start: string
  end: string
  duration: number
  paymentDurationId: number
  userId: string
  price: number
  student: User
  paymentDuration: PaymentDuration
  user: User
  payments: Payment[]
}