import { AuthenticatedRequest } from '@/presentation/authentication/requests'
import { mockAuthenticatedRequest } from '@/presentation/authentication/mocks'
import { mockListEntitiesRequest } from '@/presentation/common/mocks'
import { ListEntitiesRequest } from '@/presentation/common/requests'
import { HttpRequest } from '@/presentation/common/protocols'

export const mockListEntitiesWithAccessTokenRequest = (): HttpRequest<AuthenticatedRequest, any, ListEntitiesRequest> => ({
  body: mockAuthenticatedRequest().body,
  queryParams: mockListEntitiesRequest().queryParams
})
