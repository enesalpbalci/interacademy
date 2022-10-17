import { City } from "./city.interface"

export type Root = Facility[]

export interface Facility {
  id: number
  name: string
  cityId: number
  deleted: boolean
  city: City
}

