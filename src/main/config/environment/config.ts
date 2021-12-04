import path from 'path'
import dotenv from 'dotenv'
import { RepositoryType } from '@/infra/common/repositories'

dotenv.config({
  path: path.resolve(__dirname, '..', '..', '..', '..', '.env')
})

export type ConfigDTO = {
  port: number
  repositoryType: RepositoryType
  criptography: {
    accessTokenValidityInMinutes: number
    refreshTokenValidityInMinutes: number
    salt: number
    privateKey: string
  }
}

export const ConfigSetup = (): ConfigDTO => {
  const environment = process.env.ENVIRONMENT
  return {
    port: Number(process.env.API_PORT),
    repositoryType: environment === 'Test' ? RepositoryType.Memory : RepositoryType.TypeOrm,
    criptography: {
      accessTokenValidityInMinutes: Number(process.env.SECURITY_ACCESS_TOKEN_VALIDITY),
      refreshTokenValidityInMinutes: Number(process.env.SECURITY_REFRESH_TOKEN_VALIDITY),
      salt: Number(process.env.SECURITY_SALT),
      privateKey: process.env.SECURITY_PRIVATE_KEY
    }
  }
}
