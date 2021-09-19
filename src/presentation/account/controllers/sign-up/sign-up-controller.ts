import { Controller, HttpRequest, HttpResponse } from '@/presentation/common/protocols'
import { InvalidParamError, MissingParamError } from '@/presentation/common/errors'
import { badRequest, ok, serverError } from '@/presentation/common/helpers'
import { AddAccountUseCase } from '@/domain/account/use-cases'
import { EmailValidator } from '@/presentation/account/protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccountUseCase: AddAccountUseCase
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'password_confirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, password_confirmation } = httpRequest.body
      if (password !== password_confirmation) {
        return badRequest(new InvalidParamError('password_confirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = await this.addAccountUseCase.add({
        name,
        email,
        password
      })
      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
