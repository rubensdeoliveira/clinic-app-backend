import { Controller, HttpRequest } from '@/presentation/common/protocols'
import { Request, Response } from 'express'

export const routeAdapter = <RequestBody = any, ResponseBody = any>(controller: Controller<RequestBody, ResponseBody | Error>, fileFieldName: string = 'file') => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest<RequestBody> = {
      body: request.body,
      params: request.params,
      headers: request.headers,
      queryParams: request.query
    }

    if (request.file) {
      request.body[fileFieldName] = request.file.filename
    }

    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      if (httpResponse.file) {
        const file = Buffer.from(httpResponse.file.fileContent)
        response.contentType(httpResponse.file.contentType)
        response.writeHead(200, {
          'Content-Disposition': 'attachment'
        })
        response.end(file)
      } else {
        response.status(httpResponse.statusCode).json(httpResponse.body)
      }
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body
      })
    }
    return response
  }
}
