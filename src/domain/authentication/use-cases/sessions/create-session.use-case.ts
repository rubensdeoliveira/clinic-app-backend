import {
  AddDaysToDateContract,
  CreateAccountTokenContract,
  GetAccountByEmailContract,
  HashComparatorContract,
  TokenGeneratorContract,
} from '@/domain/authentication/contracts'
import { InvalidCredentialsError } from '@/domain/authentication/errors'
import { AccessToken, RefreshToken } from '@/domain/authentication/constants'
import { AccountModel } from '@/domain/authentication/entities'

type Setup = (
  accountsRepository: GetAccountByEmailContract,
  accountTokensRepository: CreateAccountTokenContract,
  dateGateway: AddDaysToDateContract,
  hashGateway: HashComparatorContract,
  tokenGateway: TokenGeneratorContract,
  refreshTokenGateway: TokenGeneratorContract,
) => CreateSessionUseCase
type Input = { email: string; password: string }
type Output = { account: AccountModel; token: string; refresh_token: string }
export type CreateSessionUseCase = (input: Input) => Promise<Output>

export const setupCreateSessionUseCase: Setup =
  (
    accountsRepository,
    accountTokensRepository,
    dateGateway,
    hashGateway,
    tokenGateway,
    refreshTokenGateway,
  ) =>
  async input => {
    const account = await accountsRepository.getByEmail({ email: input.email })
    if (!account) {
      throw new InvalidCredentialsError()
    }
    const passwordMatched = await hashGateway.compareHash({
      payload: input.password,
      hashedValue: account.password,
    })
    if (!passwordMatched) {
      throw new InvalidCredentialsError()
    }
    const token = tokenGateway.generateToken({
      key: account.email,
      subject: account.id,
      expirationInMs: AccessToken.expirationInMs,
    })
    const refresh_token = refreshTokenGateway.generateToken({
      key: account.email,
      subject: account.id,
      expirationInMs: RefreshToken.expirationInMs,
    })
    await accountTokensRepository.create({
      account_id: account.id,
      expires_date: dateGateway.addDays({
        days: RefreshToken.expirationInDays,
      }),
      refresh_token,
    })
    return {
      token,
      refresh_token,
      account,
    }
  }
