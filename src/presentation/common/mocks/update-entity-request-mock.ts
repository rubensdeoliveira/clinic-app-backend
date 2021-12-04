import { UpdateEntityRequest, EntityIdParamsRequestDefault } from '@/presentation/common/requests'
import { HttpRequest } from '@/presentation/common/protocols'
import { EntityModel, UpdateEntityDTO } from '@/domain/common'
import faker from 'faker'

export const mockUpdateEntityRequest = <EntityDTOType = UpdateEntityDTO<EntityModel>>
  (body: EntityDTOType = faker.random.objectElement<EntityDTOType>()):
  HttpRequest<UpdateEntityRequest<EntityDTOType>, any, any, EntityIdParamsRequestDefault> => ({
    body,
    params: {
      id: faker.datatype.uuid()
    }
  })
