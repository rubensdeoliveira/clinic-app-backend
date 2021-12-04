import { CreateAccessTokenUseCase } from '@/domain/authentication'
import { MemoryCreateAccessTokenUseCase } from '@/data/authentication/use-cases'
import { makeEncryptWithSecret } from '../../adapters'

export type CreateAccessTokenUseCaseProps = {
  privateKey: string
  accessTokenValidityInMinutes: number
  refreshTokenValidityInMinutes: number
}

export const makeCreateAccessTokenUseCase = ({ accessTokenValidityInMinutes, refreshTokenValidityInMinutes, privateKey }: CreateAccessTokenUseCaseProps): CreateAccessTokenUseCase => {
  return new MemoryCreateAccessTokenUseCase(
    accessTokenValidityInMinutes,
    refreshTokenValidityInMinutes,
    makeEncryptWithSecret(privateKey)
  )
}
