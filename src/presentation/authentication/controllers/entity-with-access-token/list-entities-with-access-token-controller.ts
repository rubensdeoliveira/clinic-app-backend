import { Controller, forbidden, HttpRequest, HttpResponse, ok, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { AuthenticatedRequest } from '@/presentation/auth/requests'
import { EntityModel, GetCustomFilterUseCase, ListEntityModel } from '@/domain/common'
import { ListEntitiesWithAccessTokenUseCase } from '@/domain/authentication'
import { RequestValidator } from '@/validation/validations'
import { AccessDeniedError } from '@/data/authentication/errors'
import { ListEntitiesRequest } from '@/presentation/common/requests'

type ListEntitiesWithAccessTokenResponse<EntityType extends EntityModel> = ListEntityModel<EntityType> | Error | object

export class ListEntitiesWithAccessTokenController<EntityType extends EntityModel> implements Controller<AuthenticatedRequest, ListEntitiesWithAccessTokenResponse<EntityType>> {
  constructor (
    private readonly bodyRequestValidator: RequestValidator,
    private readonly getCustomFilterUseCase: GetCustomFilterUseCase,
    private readonly listEntitiesWithAccessTokenUseCase: ListEntitiesWithAccessTokenUseCase<EntityType>
  ) {}

  async handle (request: HttpRequest<AuthenticatedRequest, any, ListEntitiesRequest>): Promise<HttpResponse<ListEntitiesWithAccessTokenResponse<EntityType>>> {
    const errors = this.bodyRequestValidator.validate(Object(request.body.access_token))
    if (errors) {
      return unprocessableEntity(errors)
    }
    const { page, search, size, order, direction, f = [], v = [], o = [], c = [] } = request.queryParams
    const filters = await this.getCustomFilterUseCase.getFilter({
      f: Array.isArray(f) ? f : [f],
      c: Array.isArray(c) ? c : [c],
      o: Array.isArray(o) ? o : [o],
      v: Array.isArray(v) ? v : [v]
    })
    try {
      const list = await this.listEntitiesWithAccessTokenUseCase.list({
        orderColumn: order,
        orderDirection: direction,
        page: page,
        recordsPerPage: size,
        textToSearch: search,
        filters
      }, request.body.access_token)
      return ok(list)
    } catch (error) {
      if (error instanceof AccessDeniedError) {
        return forbidden(error)
      }
      return serverError(error)
    }
  }
}
