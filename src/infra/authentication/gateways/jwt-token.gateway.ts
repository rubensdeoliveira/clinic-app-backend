import {
  TokenGeneratorContract,
  TokenValidatorContract,
} from '@/domain/authentication/contracts'

import { sign, verify, JwtPayload } from 'jsonwebtoken'

export class JwtTokenGateway
  implements TokenGeneratorContract, TokenValidatorContract
{
  constructor(private readonly secret: string) {}

  generateToken({
    expirationInMs,
    subject,
    key,
  }: TokenGeneratorContract.Input): TokenGeneratorContract.Output {
    const expirationInSeconds = expirationInMs / 1000
    return sign({ key }, this.secret, {
      expiresIn: expirationInSeconds,
      subject,
    })
  }

  validateToken({
    token,
  }: TokenValidatorContract.Input): TokenValidatorContract.Output {
    const payload = verify(token, this.secret) as JwtPayload
    return { key: payload.key, sub: payload.sub }
  }
}
