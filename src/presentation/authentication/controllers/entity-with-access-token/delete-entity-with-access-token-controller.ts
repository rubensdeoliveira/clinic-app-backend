import { Controller, forbidden, HttpRequest, HttpResponse, noContent, notFound, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { DeleteEntityByIdWithAccessTokenUseCase } from '@/domain/authentication'
import { EntityModel } from '@/domain/common'
import { EntityIsNotFoundError } from '@/data/common/errors'
import { RequestValidator } from '@/validation/validations'
import { AuthenticatedRequest } from '@/presentation/auth/requests'
import { EntityIdParamsRequestDefault } from '@/presentation/common/requests'
import { AccessDeniedError } from '@/data/authentication/errors'

type DeleteEntityWithAccessTokenResponse<EntityType> = EntityType | Error | object

export class DeleteEntityWithAccessTokenController<EntityType extends EntityModel, ParamsRequestType = EntityIdParamsRequestDefault> implements Controller<AuthenticatedRequest, DeleteEntityWithAccessTokenResponse<EntityType>, any, any, ParamsRequestType> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly deleteEntityByIdWithAccessTokenUseCase: DeleteEntityByIdWithAccessTokenUseCase<EntityType>,
    private readonly paramIdName: string
  ) {}

  async handle (request: HttpRequest<AuthenticatedRequest, any, any, ParamsRequestType>): Promise<HttpResponse<DeleteEntityWithAccessTokenResponse<EntityType>>> {
    const errors = this.validator.validate(Object(request.params))
    if (errors) {
      return unprocessableEntity(errors)
    }

    try {
      await this.deleteEntityByIdWithAccessTokenUseCase.deleteById(request.params[this.paramIdName], request.body.access_token)
      return noContent()
    } catch (error) {
      if (error instanceof EntityIsNotFoundError) {
        return notFound()
      }
      if (error instanceof AccessDeniedError) {
        return forbidden(error)
      }
      return serverError(error)
    }
  }
}
