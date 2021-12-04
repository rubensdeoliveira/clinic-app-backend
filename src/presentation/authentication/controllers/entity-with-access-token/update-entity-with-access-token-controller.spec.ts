import { UpdateEntityWithAccessTokenController } from './update-entity-with-access-token-controller'
import { RequestValidator } from '@/validation/validations'
import { UpdateEntityUseCaseSpy, EntityModel, mockEntityModel } from '@/domain/common'
import { EntityDTOWithAccessToken } from '@/domain/authentication'
import { mockUpdateEntityWithAccessTokenRequest } from '@/presentation/auth/mocks'
import { conflict, ok, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { EntityAlreadyExistsError } from '@/data/common/errors'
import faker from 'faker'

type sutTypes = {
  sut: UpdateEntityWithAccessTokenController<EntityModel, EntityDTOWithAccessToken>
  validator: RequestValidator
  updateEntityUseCase: UpdateEntityUseCaseSpy<EntityModel, EntityDTOWithAccessToken>
}

const makeSut = (): sutTypes => {
  const validator = new RequestValidator()
  const updateEntityUseCase = new UpdateEntityUseCaseSpy<EntityModel, EntityDTOWithAccessToken>()
  const sut = new UpdateEntityWithAccessTokenController<EntityModel>(validator, updateEntityUseCase, 'id')
  return {
    sut,
    validator,
    updateEntityUseCase
  }
}

describe('UpdateEntityWithAccessTokenController', () => {
  test('Should call validator with correct value', async () => {
    const { sut, validator } = makeSut()
    const request = mockUpdateEntityWithAccessTokenRequest()
    const validateSpy = jest.spyOn(validator, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(Object(request.body))
  })

  test('Should return unprocessableEntity if validator fails', async () => {
    const { sut, validator } = makeSut()
    const error = new Error()
    jest.spyOn(validator, 'validate').mockReturnValue(error)
    const result = await sut.handle(mockUpdateEntityWithAccessTokenRequest())
    expect(result).toEqual(unprocessableEntity(error))
  })

  test('Should call UpdateEntityUseCase with correct value', async () => {
    const { sut, updateEntityUseCase } = makeSut()
    const request = mockUpdateEntityWithAccessTokenRequest()
    const updateSpy = jest.spyOn(updateEntityUseCase, 'update')
    await sut.handle(request)
    expect(updateSpy).toHaveBeenCalledWith(request.params.id, request.body)
  })

  test('Should return conflict if UpdateEntityUseCase return EntityAlreadyExistsError', async () => {
    const { sut, updateEntityUseCase } = makeSut()
    const entityName = faker.database.column()
    jest.spyOn(updateEntityUseCase, 'update').mockImplementationOnce(() => { throw new EntityAlreadyExistsError(entityName) })
    const result = await sut.handle(mockUpdateEntityWithAccessTokenRequest())
    expect(result).toEqual(conflict(new EntityAlreadyExistsError(entityName)))
  })

  test('Should return serverError if UpdateEntityUseCase return other error', async () => {
    const { sut, updateEntityUseCase } = makeSut()
    jest.spyOn(updateEntityUseCase, 'update').mockImplementationOnce(() => { throw new Error() })
    const result = await sut.handle(mockUpdateEntityWithAccessTokenRequest())
    expect(result).toEqual(serverError(new Error()))
  })

  test('Should return ok if UpdateEntityUseCase is succeeds and UpdateEntityUseCase returns a entity', async () => {
    const { sut, updateEntityUseCase } = makeSut()
    updateEntityUseCase.entity = mockEntityModel()
    const result = await sut.handle(mockUpdateEntityWithAccessTokenRequest())
    expect(result).toEqual(ok(updateEntityUseCase.entity))
  })
})
