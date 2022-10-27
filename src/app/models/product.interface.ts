import { Contract } from "./contract.interface"
import { Facility } from "./facility.interface"
import { PaymentDuration } from "./payment-duration.interface"

export type Root = Product[]

export interface Product {
  id: number
  name: string
  duration: number
  facilityId: number
  deleted: boolean
  advancePrice: number
  advancePriceStr: string
  installmentPrice: number
  installmentPriceStr: string
  installmentTotal: number
  installmentTotalStr: string
  facility: Facility
  contracts: Contract
  paymentDurations: PaymentDuration
}

