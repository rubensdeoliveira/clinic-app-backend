import { CreateUserAccountController } from './create-user-account-controller'
import { CreateUserAccountDTO, CreateUserAccountAndSessionUseCaseSpy } from '@/domain/authentication'
import { EmailInUseError } from '@/data/authentication/errors'
import { mockCreateUserAccountRequest } from '@/presentation/auth/mocks'
import { RequestValidator } from '@/validation/validations'
import { unprocessableEntity, conflict, serverError, created } from '@/presentation/common/protocols'
import faker from 'faker'

type sutTypes = {
  sut: CreateUserAccountController
  requestValidator: RequestValidator
  createUserAccountAndSessionUseCase: CreateUserAccountAndSessionUseCaseSpy
}

const makeSut = (): sutTypes => {
  const requestValidator = new RequestValidator()
  const createUserAccountAndSessionUseCase = new CreateUserAccountAndSessionUseCaseSpy()
  const sut = new CreateUserAccountController(requestValidator, createUserAccountAndSessionUseCase)
  return {
    sut,
    requestValidator,
    createUserAccountAndSessionUseCase
  }
}

describe('CreateUserAccountController', () => {
  test('Should call RequestValidator with correct value', async () => {
    const { sut, requestValidator } = makeSut()
    const request = mockCreateUserAccountRequest()
    const validateSpy = jest.spyOn(requestValidator, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return unprocessableEntity if RequestValidator fails', async () => {
    const { sut, requestValidator } = makeSut()
    const errors = faker.random.objectElement<object>()
    jest.spyOn(requestValidator, 'validate').mockReturnValue(errors)
    const response = await sut.handle(mockCreateUserAccountRequest())
    expect(response).toEqual(unprocessableEntity(errors))
  })

  test('Should call CreateUserAccountUseCase with correct value', async () => {
    const { sut, createUserAccountAndSessionUseCase } = makeSut()
    const request = mockCreateUserAccountRequest()
    await sut.handle(request)
    expect(createUserAccountAndSessionUseCase.params).toEqual({
      name: request.body.name,
      identification: request.body.identification,
      email: request.body.email,
      password: request.body.password
    })
  })

  test('Should return conflict if CreateUserAccountUseCase return EmailIsInUseError', async () => {
    const { sut, createUserAccountAndSessionUseCase } = makeSut()
    jest.spyOn(createUserAccountAndSessionUseCase, 'create').mockImplementationOnce((params: CreateUserAccountDTO) => { throw new EmailInUseError() })
    const response = await sut.handle(mockCreateUserAccountRequest())
    expect(response).toEqual(conflict(new EmailInUseError()))
  })

  test('Should return serverError if CreateUserAccountUseCase return expcetion', async () => {
    const { sut, createUserAccountAndSessionUseCase } = makeSut()
    jest.spyOn(createUserAccountAndSessionUseCase, 'create').mockImplementationOnce((params: CreateUserAccountDTO) => { throw new Error() })
    const response = await sut.handle(mockCreateUserAccountRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return created if CreateUserAccountUseCase is succeeds', async () => {
    const { sut, createUserAccountAndSessionUseCase } = makeSut()
    const response = await sut.handle(mockCreateUserAccountRequest())
    expect(response).toEqual(created(createUserAccountAndSessionUseCase.accessToken))
  })
})
