import { ShowEntityWithAccessTokenController } from './show-entity-with-access-token-controller'
import { EntityIdParamsRequestDefault } from '@/presentation/common/requests'
import { EntityModel } from '@/domain/common'
import { GetEntityByIdWithAccessTokenUseCaseSpy } from '@/domain/authentication'
import { RequestValidator } from '@/validation/validations'
import { mockEntityIdParamsWithAccessTokenRequestDefault } from '@/presentation/auth/mocks'
import { forbidden, notFound, ok, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { EntityIsNotFoundError } from '@/data/common/errors'
import { AccessDeniedError } from '@/data/authentication/errors'
import faker from 'faker'

type sutTypes = {
  sut: ShowEntityWithAccessTokenController<EntityModel, EntityIdParamsRequestDefault>
  requestValidator: RequestValidator
  getEntityByIdWithAccessTokenUseCase: GetEntityByIdWithAccessTokenUseCaseSpy
}

const makeSut = (): sutTypes => {
  const requestValidator = new RequestValidator()
  const getEntityByIdWithAccessTokenUseCase = new GetEntityByIdWithAccessTokenUseCaseSpy()
  const sut = new ShowEntityWithAccessTokenController<EntityModel, EntityIdParamsRequestDefault>(requestValidator, getEntityByIdWithAccessTokenUseCase, 'id')
  return {
    sut,
    requestValidator,
    getEntityByIdWithAccessTokenUseCase
  }
}

describe('ShowEntityWithAccessTokenController', () => {
  test('Should call RequestValidator with correct value', async () => {
    const { sut, requestValidator } = makeSut()
    const request = mockEntityIdParamsWithAccessTokenRequestDefault()
    const validateSpy = jest.spyOn(requestValidator, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.params)
  })

  test('Should return unprocessableEntity if RequestValidator fails', async () => {
    const { sut, requestValidator } = makeSut()
    const errors = faker.random.objectElement<object>()
    jest.spyOn(requestValidator, 'validate').mockReturnValue(errors)
    const response = await sut.handle(mockEntityIdParamsWithAccessTokenRequestDefault())
    expect(response).toEqual(unprocessableEntity(errors))
  })

  test('Should call getEntityByIdWithAccessTokenUseCase with correct value', async () => {
    const { sut, getEntityByIdWithAccessTokenUseCase } = makeSut()
    const request = mockEntityIdParamsWithAccessTokenRequestDefault()
    await sut.handle(request)
    expect(getEntityByIdWithAccessTokenUseCase.entityId).toBe(request.params.id)
    expect(getEntityByIdWithAccessTokenUseCase.accessToken).toBe(request.body.access_token)
  })

  test('Should return notFound if getEntityByIdWithAccessTokenUseCase return EntityIsNotFoundError', async () => {
    const { sut, getEntityByIdWithAccessTokenUseCase } = makeSut()
    jest.spyOn(getEntityByIdWithAccessTokenUseCase, 'getById').mockImplementationOnce(() => { throw new EntityIsNotFoundError('Entity') })
    const response = await sut.handle(mockEntityIdParamsWithAccessTokenRequestDefault())
    expect(response).toEqual(notFound())
  })

  test('Should return forbidden if getEntityByIdWithAccessTokenUseCase return AccessDeniedError', async () => {
    const { sut, getEntityByIdWithAccessTokenUseCase } = makeSut()
    jest.spyOn(getEntityByIdWithAccessTokenUseCase, 'getById').mockImplementationOnce(() => { throw new AccessDeniedError() })
    const response = await sut.handle(mockEntityIdParamsWithAccessTokenRequestDefault())
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return serverError if getEntityByIdWithAccessTokenUseCase return expcetion', async () => {
    const { sut, getEntityByIdWithAccessTokenUseCase } = makeSut()
    jest.spyOn(getEntityByIdWithAccessTokenUseCase, 'getById').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(mockEntityIdParamsWithAccessTokenRequestDefault())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return ok if getEntityByIdWithAccessTokenUseCase is succeeds', async () => {
    const { sut, getEntityByIdWithAccessTokenUseCase } = makeSut()
    const response = await sut.handle(mockEntityIdParamsWithAccessTokenRequestDefault())
    expect(response).toEqual(ok(getEntityByIdWithAccessTokenUseCase.entity))
  })
})
