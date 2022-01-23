import { AccountType } from '@/domain/authentication/constants'

export type RegisterAccountDTO = {
  name: string
  email: string
  password: string
  type: AccountType
}
