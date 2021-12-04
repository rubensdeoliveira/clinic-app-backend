import { Express } from 'express'
import { ConfigSetup } from '@/main/config/environment'
import { makeAuthenticationRoute } from '@/main/factories/authentication/routes'

export default async (app: Express): Promise<void> => {
  const config = ConfigSetup()
  app.use('/', makeAuthenticationRoute({
    accessTokenValidityInMinutes: config.criptography.accessTokenValidityInMinutes,
    refreshTokenValidityInMinutes: config.criptography.refreshTokenValidityInMinutes,
    repositoryType: config.repositoryType,
    salt: config.criptography.salt,
    privateKey: config.criptography.privateKey
  }))
}
