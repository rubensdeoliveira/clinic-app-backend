import { RegisterAccountDTO } from '@/domain/authentication/dtos'
import { AccountModel } from '@/domain/authentication/entities'

export interface RegisterAccountContract {
  register: (
    input: RegisterAccountContract.Input,
  ) => Promise<RegisterAccountContract.Output>
}

export namespace RegisterAccountContract {
  export type Input = RegisterAccountDTO
  export type Output = Omit<AccountModel, 'password'>
}

export interface GetAccountByEmailContract {
  getByEmail: (
    input: GetAccountByEmailContract.Input,
  ) => Promise<GetAccountByEmailContract.Output>
}

export namespace GetAccountByEmailContract {
  export type Input = { email: string }
  export type Output = AccountModel
}

export interface GetAccountByIdContract {
  getById: (
    input: GetAccountByIdContract.Input,
  ) => Promise<GetAccountByIdContract.Output>
}

export namespace GetAccountByIdContract {
  export type Input = { id: string }
  export type Output = undefined | Omit<AccountModel, 'password'>
}

export interface GetAdminIdByAccountIdContract {
  getAdminIdByAccountId: (
    input: GetAdminIdByAccountIdContract.Input,
  ) => Promise<GetAdminIdByAccountIdContract.Output>
}

export namespace GetAdminIdByAccountIdContract {
  export type Input = { account_id: string }
  export type Output = string
}
