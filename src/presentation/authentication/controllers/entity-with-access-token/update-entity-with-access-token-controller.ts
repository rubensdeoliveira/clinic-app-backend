import { UpdateEntityController, UpdateEntityRequestDefault } from '@/presentation/common/controllers'
import { EntityModel } from '@/domain/common'
import { EntityDTOWithAccessToken, UpdateEntityWithAccessTokenUseCase } from '@/domain/authentication'
import { RequestValidator } from '@/validation/validations'

export class UpdateEntityWithAccessTokenController<EntityType extends EntityModel, UpdateEntityDTOType extends EntityDTOWithAccessToken = EntityDTOWithAccessToken, ParamsRequestType = UpdateEntityRequestDefault>
  extends UpdateEntityController<EntityType, UpdateEntityDTOType, ParamsRequestType> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor (
    validator: RequestValidator,
    updateEntityWithAccessTokenUseCase: UpdateEntityWithAccessTokenUseCase<EntityType, UpdateEntityDTOType>,
    paramIdName: string
  ) {
    super(validator, updateEntityWithAccessTokenUseCase, paramIdName)
  }
}
