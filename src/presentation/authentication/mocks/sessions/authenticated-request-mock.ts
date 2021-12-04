import { mockAccessTokenPayloadModel } from '@/domain/authentication'
import { AuthenticatedRequest } from '@/presentation/authentication/requests'
import { HttpRequest } from '@/presentation/common/protocols'

export const mockAuthenticatedRequest = (): HttpRequest<AuthenticatedRequest> => ({
  body: {
    access_token: mockAccessTokenPayloadModel()
  }
})
