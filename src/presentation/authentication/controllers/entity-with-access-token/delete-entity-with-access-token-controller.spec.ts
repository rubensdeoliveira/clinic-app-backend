import { DeleteEntityWithAccessTokenController } from './delete-entity-with-access-token-controller'
import { EntityIdParamsRequestDefault } from '@/presentation/common/requests'
import { EntityModel } from '@/domain/common'
import { DeleteEntityByIdWithAccessTokenUseCaseSpy } from '@/domain/authentication'
import { RequestValidator } from '@/validation/validations'
import { mockEntityIdParamsWithAccessTokenRequestDefault } from '@/presentation/auth/mocks'
import { forbidden, noContent, notFound, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { EntityIsNotFoundError } from '@/data/common/errors'
import { AccessDeniedError } from '@/data/authentication/errors'
import faker from 'faker'

type sutTypes = {
  sut: DeleteEntityWithAccessTokenController<EntityModel, EntityIdParamsRequestDefault>
  requestValidator: RequestValidator
  deleteEntityByIdWithAccessTokenUseCase: DeleteEntityByIdWithAccessTokenUseCaseSpy
}

const makeSut = (): sutTypes => {
  const requestValidator = new RequestValidator()
  const deleteEntityByIdWithAccessTokenUseCase = new DeleteEntityByIdWithAccessTokenUseCaseSpy()
  const sut = new DeleteEntityWithAccessTokenController<EntityModel, EntityIdParamsRequestDefault>(requestValidator, deleteEntityByIdWithAccessTokenUseCase, 'id')
  return {
    sut,
    requestValidator,
    deleteEntityByIdWithAccessTokenUseCase
  }
}

describe('DeleteEntityWithAccessTokenController', () => {
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

  test('Should call DeleteEntityByIdWithAccessTokenUseCase with correct value', async () => {
    const { sut, deleteEntityByIdWithAccessTokenUseCase } = makeSut()
    const request = mockEntityIdParamsWithAccessTokenRequestDefault()
    await sut.handle(request)
    expect(deleteEntityByIdWithAccessTokenUseCase.entityId).toBe(request.params.id)
    expect(deleteEntityByIdWithAccessTokenUseCase.accessToken).toBe(request.body.access_token)
  })

  test('Should return notFound if DeleteEntityByIdWithAccessTokenUseCase return EntityIsNotFoundError', async () => {
    const { sut, deleteEntityByIdWithAccessTokenUseCase } = makeSut()
    jest.spyOn(deleteEntityByIdWithAccessTokenUseCase, 'deleteById').mockImplementationOnce(() => { throw new EntityIsNotFoundError('Entity') })
    const response = await sut.handle(mockEntityIdParamsWithAccessTokenRequestDefault())
    expect(response).toEqual(notFound())
  })

  test('Should return forbidden if DeleteEntityByIdWithAccessTokenUseCase return AccessDeniedError', async () => {
    const { sut, deleteEntityByIdWithAccessTokenUseCase } = makeSut()
    jest.spyOn(deleteEntityByIdWithAccessTokenUseCase, 'deleteById').mockImplementationOnce(() => { throw new AccessDeniedError() })
    const response = await sut.handle(mockEntityIdParamsWithAccessTokenRequestDefault())
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return serverError if DeleteEntityByIdWithAccessTokenUseCase return expcetion', async () => {
    const { sut, deleteEntityByIdWithAccessTokenUseCase } = makeSut()
    jest.spyOn(deleteEntityByIdWithAccessTokenUseCase, 'deleteById').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(mockEntityIdParamsWithAccessTokenRequestDefault())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return noContent if DeleteEntityByIdWithAccessTokenUseCase is succeeds', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockEntityIdParamsWithAccessTokenRequestDefault())
    expect(response).toEqual(noContent())
  })
})
