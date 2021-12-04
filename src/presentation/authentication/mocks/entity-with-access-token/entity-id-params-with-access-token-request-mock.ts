import { AuthenticatedRequest } from '@/presentation/authentication/requests'
import { EntityIdParamsRequestDefault } from '@/presentation/common/requests'
import { mockAuthenticatedRequest } from '@/presentation/authentication/mocks'
import { mockEntityIdParamsRequestDefault } from '@/presentation/common/mocks'
import { HttpRequest } from '@/presentation/common/protocols'

export const mockEntityIdParamsWithAccessTokenRequestDefault = (): HttpRequest<AuthenticatedRequest, any, any, EntityIdParamsRequestDefault> => ({
  body: mockAuthenticatedRequest().body,
  params: mockEntityIdParamsRequestDefault().params
})
