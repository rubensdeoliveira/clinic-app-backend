import { Controller, forbidden, HttpRequest, HttpResponse, notFound, ok, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { GetEntityByIdWithAccessTokenUseCase } from '@/domain/authentication'
import { EntityModel } from '@/domain/common'
import { EntityIsNotFoundError } from '@/data/common/errors'
import { RequestValidator } from '@/validation/validations'
import { AuthenticatedRequest } from '@/presentation/auth/requests'
import { EntityIdParamsRequestDefault } from '@/presentation/common/requests'
import { AccessDeniedError } from '@/data/authentication/errors'

type ShowEntityWithAccessTokenResponse<EntityType> = EntityType | Error | object

export class ShowEntityWithAccessTokenController<EntityType extends EntityModel, ParamsRequestType = EntityIdParamsRequestDefault> implements Controller<AuthenticatedRequest, ShowEntityWithAccessTokenResponse<EntityType>, any, any, ParamsRequestType> {
  constructor (
    private readonly validator: RequestValidator,
    private readonly getEntityByIdWithAccessTokenUseCase: GetEntityByIdWithAccessTokenUseCase<EntityType>,
    private readonly paramIdName: string
  ) {}

  async handle (request: HttpRequest<AuthenticatedRequest, any, any, ParamsRequestType>): Promise<HttpResponse<ShowEntityWithAccessTokenResponse<EntityType>>> {
    const errors = this.validator.validate(Object(request.params))
    if (errors) {
      return unprocessableEntity(errors)
    }

    try {
      const entity = await this.getEntityByIdWithAccessTokenUseCase.getById(request.params[this.paramIdName], request.body.access_token)
      return ok(entity)
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
