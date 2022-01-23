import { DayjsDateGateway } from '@/infra/authentication/gateways'

export const makeDayjsDateGateway = (): DayjsDateGateway => {
  return new DayjsDateGateway()
}
