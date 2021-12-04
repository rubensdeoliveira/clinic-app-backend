import { HttpFileResponse } from '@/presentation/common/protocols'

export interface HttpResponse<BodyType = any> {
  statusCode: number
  body: BodyType
  file?: HttpFileResponse
}
