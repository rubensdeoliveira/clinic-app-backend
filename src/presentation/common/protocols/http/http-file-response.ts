import { HttpContentType } from '@/presentation/common/protocols'

export type HttpFileResponse = {
  fileContent: ArrayBuffer
  contentType: HttpContentType
}
