import { CreateEntityController } from '@/presentation/common/controllers'
import { EntityModel } from '@/domain/common'
import { EntityDTOWithAccessToken, CreateEntityWithAccessTokenUseCase } from '@/domain/authentication'
import { RequestValidator } from '@/validation/validations'

export class CreateEntityWithAccessTokenController<EntityType extends EntityModel, CreateEntityDTOType extends EntityDTOWithAccessToken = EntityDTOWithAccessToken>
  extends CreateEntityController<EntityType, CreateEntityDTOType> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor (
    validator: RequestValidator,
    createEntityWithAccessTokenUseCase: CreateEntityWithAccessTokenUseCase<EntityType, CreateEntityDTOType>
  ) {
    super(validator, createEntityWithAccessTokenUseCase)
  }
}
