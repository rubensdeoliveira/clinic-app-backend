import { AuthenticatedRequest } from '@/presentation/authentication/requests'
import { UpdateEntityRequest, EntityIdParamsRequestDefault } from '@/presentation/common/requests'
import { HttpRequest } from '@/presentation/common/protocols'
import { EntityModel, UpdateEntityDTO } from '@/domain/common'
import { EntityDTOWithAccessToken } from '@/domain/authentication'
import faker from 'faker'

export const mockUpdateEntityWithAccessTokenRequest = <EntityDTOType extends EntityDTOWithAccessToken = UpdateEntityDTO<EntityModel> & AuthenticatedRequest>
  (body: EntityDTOType = faker.random.objectElement<EntityDTOType>()):
  HttpRequest<UpdateEntityRequest<EntityDTOType>, any, any, EntityIdParamsRequestDefault> => ({
    body,
    params: {
      id: faker.datatype.uuid()
    }
  })
