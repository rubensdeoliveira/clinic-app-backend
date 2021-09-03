import { Controller, HttpRequest, HttpResponse } from '../../../common/protocols'
import { InvalidParamError, MissingParamError } from '../../../common/errors'
import { badRequest, ok, serverError } from '../../../common/helpers'
import { AddAccountUseCase } from '@/domain/account/use-cases'
import { EmailValidator } from '../../protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccountUseCase: AddAccountUseCase

  constructor (emailValidator: EmailValidator, addAccountUseCase: AddAccountUseCase) {
    this.emailValidator = emailValidator
    this.addAccountUseCase = addAccountUseCase
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
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
