export type Root = UserClaim[]

export interface UserClaim {
  issuer: string
  originalIssuer: string
  properties: Properties
  subject: Subject
  type: string
  value: string
  valueType: string
}

export interface Properties {
  additionalProp1: string
  additionalProp2: string
  additionalProp3: string
}

export interface Subject {
  authenticationType: string
  isAuthenticated: boolean
  actor: string
  bootstrapContext: string
  claims: string[]
  label: string
  name: string
  nameClaimType: string
  roleClaimType: string
}