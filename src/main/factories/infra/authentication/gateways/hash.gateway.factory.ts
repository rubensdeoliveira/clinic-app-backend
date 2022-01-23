import { BCryptHashGateway } from '@/infra/authentication/gateways'

export const makeBCryptHashGateway = (): BCryptHashGateway => {
  return new BCryptHashGateway()
}
