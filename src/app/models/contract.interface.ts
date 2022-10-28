import { Payment } from "./payment.interface"
import { Product } from "./product.interface"
import { User } from "./user.interface"

export type Root = Contract[]

export interface Contract {
  id: number
  studentId: string
  start: string
  end: string
  installments: number
  userId: string
  price: number
  priceStr: string
  approverId: string
  productId: number
  cancelled: boolean
  student: User
  product: Product
  user: User
  payments: Payment[]
}