import { City } from "./city.interface"
import { Facility } from "./facility.interface"
import { Group } from "./group.interface"

export type Root = User[]

export interface User {
  id: string
  userName: string
  normalizedUserName: string
  email: string
  normalizedEmail: string
  emailConfirmed: boolean
  passwordHash: string
  securityStamp: string
  concurrencyStamp: string
  phoneNumber: string
  phoneNumberConfirmed: boolean
  twoFactorEnabled: boolean
  lockoutEnd: string
  lockoutEnabled: boolean
  accessFailedCount: number
  name: string
  surName: string
  deleted: boolean
  idNumber: string
  birthDay: string
  gender: boolean
  school: string
  bloodGroup: number
  height: number
  weight: number
  motherId: string
  fatherId: string
  profession: string
  address: string
  emergencyPerson: string
  diseases: string
  allergies: string
  foodRestrictions: string
  groupId: number
  image: string
  facilityId: number
  cityId: number
  mother: User
  father: User
  group: Group
  facility: Facility
  city: City
}
