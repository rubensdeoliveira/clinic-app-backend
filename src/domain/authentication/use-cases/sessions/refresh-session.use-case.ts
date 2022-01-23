import {
  AddDaysToDateContract,
  CreateAccountTokenContract,
  DeleteAccountTokenByIdContract,
  GetAccountTokenByAccountIdAndRefreshTokenTokenContract,
  TokenGeneratorContract,
  TokenValidatorContract,
} from '@/domain/authentication/contracts'
import { RefreshTokenError } from '@/domain/authentication/errors'
import { AccessToken, RefreshToken } from '@/domain/authentication/constants'

type Setup = (
  accountTokensRepository: CreateAccountTokenContract &
    GetAccountTokenByAccountIdAndRefreshTokenTokenContract &
    DeleteAccountTokenByIdContract,
  dateGateway: AddDaysToDateContract,
  tokenGateway: TokenGeneratorContract & TokenValidatorContract,
  refreshTokenGateway: TokenGeneratorContract & TokenValidatorContract,
) => RefreshSessionUseCase
type Input = { refresh_token: string }
type Output = { refresh_token: string; token: string }
export type RefreshSessionUseCase = (input: Input) => Promise<Output>

export const setupRefreshSessionUseCase: Setup =
  (accountTokensRepository, dateGateway, tokenGateway, refreshTokenGateway) =>
  async input => {
    const decode = refreshTokenGateway.validateToken({
      token: input.refresh_token,
    })
    const accountId = decode.sub
    const accountEmail = decode.key
    const accountToken =
      await accountTokensRepository.getByAccountIdAndRefreshToken({
        account_id: accountId,
        refresh_token: input.refresh_token,
      })
    if (!accountToken) {
      throw new RefreshTokenError()
    }
    await accountTokensRepository.deleteById({ id: accountToken.id })
    const refresh_token = refreshTokenGateway.generateToken({
      key: accountEmail,
      subject: accountId,
      expirationInMs: RefreshToken.expirationInMs,
    })
    await accountTokensRepository.create({
      account_id: accountId,
      expires_date: dateGateway.addDays({
        days: RefreshToken.expirationInDays,
      }),
      refresh_token,
    })
    const newToken = tokenGateway.generateToken({
      key: accountEmail,
      subject: accountId,
      expirationInMs: AccessToken.expirationInMs,
    })
    return { refresh_token, token: newToken }
  }
