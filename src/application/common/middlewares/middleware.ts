import { HttpResponse } from '@/application/common/helpers'

export interface Middleware {
  handle: (httpRequest: any) => Promise<HttpResponse>
}
