import { AuthenticatedRequest } from '@/presentation/authentication/middlewares'
import { HttpRequest } from '@/presentation/common/protocols'
import faker from 'faker'

export const mockAuthenticatedMiddlewareRequest = (): HttpRequest<AuthenticatedRequest> => ({
  headers: {
    access_token: faker.datatype.uuid()
  }
})
