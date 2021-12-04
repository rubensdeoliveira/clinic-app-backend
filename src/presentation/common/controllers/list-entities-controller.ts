import { Controller, HttpRequest, HttpResponse, ok, serverError } from '@/presentation/common/protocols'
import { GetCustomFilterUseCase, ListEntitiesUseCase } from '@/domain/common'
import { ListEntitiesRequest } from '@/presentation/common/requests'

type ListEntitiesResponse<RecordType = object> = RecordType[] | Error | object

export class ListEntitiesController<RecordType = object> implements Controller<any, ListEntitiesResponse<RecordType>, any, ListEntitiesRequest> {
  constructor (
    private readonly getCustomFilterUseCase: GetCustomFilterUseCase,
    private readonly listEntitiesUseCase: ListEntitiesUseCase
  ) {}

  async handle (request: HttpRequest<any, any, ListEntitiesRequest>): Promise<HttpResponse<ListEntitiesResponse>> {
    const { page, search, size, order, direction, f = [], v = [], o = [], c = [] } = request.queryParams
    try {
      const filters = await this.getCustomFilterUseCase.getFilter({
        f: Array.isArray(f) ? f : [f],
        c: Array.isArray(c) ? c : [c],
        o: Array.isArray(o) ? o : [o],
        v: Array.isArray(v) ? v : [v]
      })
      const list = await this.listEntitiesUseCase.list({
        page,
        textToSearch: search,
        recordsPerPage: size,
        orderColumn: order,
        orderDirection: direction,
        filters
      })
      return ok(list)
    } catch (error) {
      return serverError(error)
    }
  }
}
