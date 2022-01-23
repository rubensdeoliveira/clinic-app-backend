import { AccountTokenModel } from '@/domain/authentication/entities'

export interface CreateAccountTokenContract {
  create: (
    input: CreateAccountTokenContract.Input,
  ) => Promise<CreateAccountTokenContract.Output>
}

export namespace CreateAccountTokenContract {
  export type Input = {
    expires_date: Date
    refresh_token: string
    account_id: string
  }
  export type Output = undefined | AccountTokenModel
}

export interface GetAccountTokenByAccountIdAndRefreshTokenTokenContract {
  getByAccountIdAndRefreshToken: (
    input: GetAccountTokenByAccountIdAndRefreshTokenTokenContract.Input,
  ) => Promise<GetAccountTokenByAccountIdAndRefreshTokenTokenContract.Output>
}

export namespace GetAccountTokenByAccountIdAndRefreshTokenTokenContract {
  export type Input = { account_id: string; refresh_token: string }
  export type Output = undefined | AccountTokenModel
}

export interface DeleteAccountTokenByIdContract {
  deleteById: (input: DeleteAccountTokenByIdContract.Input) => Promise<void>
}

export namespace DeleteAccountTokenByIdContract {
  export type Input = { id: string }
}
