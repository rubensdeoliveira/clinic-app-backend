import { ListUserTypesController } from './list-account-types-controller'
import { mockAuthenticatedRequest } from '@/presentation/auth/mocks'
import { ListUserTypeUseCaseSpy } from '@/domain/authentication'
import { RequestValidator } from '@/validation/validations'
import { ok, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import faker from 'faker'

type sutTypes = {
  sut: ListUserTypesController
  requestValidator: RequestValidator
  listUserTypeUseCase: ListUserTypeUseCaseSpy
}

const makeSut = (): sutTypes => {
  const requestValidator = new RequestValidator()
  const listUserTypeUseCase = new ListUserTypeUseCaseSpy()
  const sut = new ListUserTypesController(requestValidator, listUserTypeUseCase)
  return {
    sut,
    requestValidator,
    listUserTypeUseCase
  }
}

describe('ListUserTypesController', () => {
  test('Should call RequestValidator with correct value', async () => {
    const { sut, requestValidator } = makeSut()
    const request = mockAuthenticatedRequest()
    const validateSpy = jest.spyOn(requestValidator, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body.access_token)
  })

  test('Should return unprocessableEntity if RequestValidator fails', async () => {
    const { sut, requestValidator } = makeSut()
    const errors = faker.random.objectElement<object>()
    jest.spyOn(requestValidator, 'validate').mockReturnValue(errors)
    const response = await sut.handle(mockAuthenticatedRequest())
    expect(response).toEqual(unprocessableEntity(errors))
  })

  test('Should call ListUserTypeUseCase with correct value', async () => {
    const { sut, listUserTypeUseCase } = makeSut()
    const request = mockAuthenticatedRequest()
    await sut.handle(request)
    expect(listUserTypeUseCase.authenticatedUserType).toBe(request.body.access_token.userType)
  })

  test('Should return serverError if ListUserTypeUseCase return expcetion', async () => {
    const { sut, listUserTypeUseCase } = makeSut()
    jest.spyOn(listUserTypeUseCase, 'list').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(mockAuthenticatedRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return ok if ListUserTypeUseCase is succeeds', async () => {
    const { sut, listUserTypeUseCase } = makeSut()
    const response = await sut.handle(mockAuthenticatedRequest())
    expect(response).toEqual(ok(listUserTypeUseCase.types))
  })
})
