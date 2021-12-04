import { HttpRequest, HttpResponse } from './http'

export interface Middleware<RequestBody, ResponseBody> {
  handle: (request: HttpRequest<RequestBody>) => Promise<HttpResponse<ResponseBody>>
}
