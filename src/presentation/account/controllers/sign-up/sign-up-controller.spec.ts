import { SignUpController } from './sign-up-controller'
import { MissingParamError, InvalidParamError, ServerError } from '../../../common/errors'
import { EmailValidator } from '../../protocols'
import { AddAccountUseCaseSpy, mockAddAccountDTO } from '../../../../domain/account/mocks'
import { EmailValidatorSpy, mockAddAccountRequest } from '../../mocks'

type SutTypes = {
  sut: SignUpController
  emailValidator: EmailValidator
  addAccountUseCase: AddAccountUseCaseSpy
}

const makeSut = (): SutTypes => {
  const emailValidator = new EmailValidatorSpy()
  const addAccountUseCase = new AddAccountUseCaseSpy()
  addAccountUseCase.account = mockAddAccountDTO()
  const sut = new SignUpController(emailValidator, addAccountUseCase)
  return {
    sut,
    emailValidator,
    addAccountUseCase
  }
}

describe('SignUpController', () => {
  test('Should render 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockAddAccountRequest()
    delete httpRequest.body.name
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should render 400 if no email is provided',async () => {
    const { sut } = makeSut()
    const httpRequest = mockAddAccountRequest()
    delete httpRequest.body.email
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should render 400 if no password is provided',async () => {
    const { sut } = makeSut()
    const httpRequest = mockAddAccountRequest()
    delete httpRequest.body.password
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should render 400 if no password confirmation is provided',async () => {
    const { sut } = makeSut()
    const httpRequest = mockAddAccountRequest()
    delete httpRequest.body.password_confirmation
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password_confirmation'))
  })

  test('Should render 400 if password confirmation fails',async () => {
    const { sut } = makeSut()
    const httpRequest = mockAddAccountRequest()
    httpRequest.body.password_confirmation = 'different_password'
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('password_confirmation'))
  })

  test('Should render 400 if an invalid email is provided',async () => {
    const { sut, emailValidator } = makeSut()
    jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false)
    const httpRequest = mockAddAccountRequest()
    httpRequest.body.email = 'invalid_email'
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email',async () => {
    const { sut, emailValidator } = makeSut()
    const isValidSpy = jest.spyOn(emailValidator, 'isValid')
    const httpRequest = mockAddAccountRequest()
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  test('Should render 500 email validator throws a error',async () => {
    const { sut, emailValidator } = makeSut()
    jest.spyOn(emailValidator, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = mockAddAccountRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call AddAccount with correct values',async () => {
    const { sut, addAccountUseCase } = makeSut()
    const addSpy = jest.spyOn(addAccountUseCase, 'add')
    const httpRequest = mockAddAccountRequest()
    await sut.handle(httpRequest)
    delete httpRequest.body.password_confirmation
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should render 500 if AddAccountUseCase throws',async () => {
    const { sut, addAccountUseCase } = makeSut()
    jest.spyOn(addAccountUseCase, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = mockAddAccountRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 200 if valid data is provided',async () => {
    const { sut, addAccountUseCase } = makeSut()
    const httpRequest = mockAddAccountRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(addAccountUseCase.accountModel)
  })
})
