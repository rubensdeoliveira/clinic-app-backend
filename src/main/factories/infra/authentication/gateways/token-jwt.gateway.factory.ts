import { env } from '@/main/app/config/env'
import { JwtTokenGateway } from '@/infra/authentication/gateways'

export const makeJwtTokenGateway = (refresh?: boolean): JwtTokenGateway => {
  return new JwtTokenGateway(
    refresh ? env.jwtRefreshTokenSecret : env.jwtTokenSecret,
  )
}
