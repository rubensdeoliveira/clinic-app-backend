import { UpdateEntityController, UpdateEntityRequestDefault } from './update-entity-controller'
import { RequestValidator } from '@/validation/validations'
import { EntityModel, UpdateEntityDTO, UpdateEntityUseCaseSpy } from '@/domain/common'
import { mockUpdateEntityRequest } from '@/presentation/common/mocks'
import { conflict, HttpRequest, ok, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { EntityAlreadyExistsError } from '@/data/common/errors'
import { UpdateEntityRequest } from '@/presentation/common/requests'
import faker from 'faker'

type sutTypes = {
  sut: UpdateEntityController<EntityModel>
  validator: RequestValidator
  request: HttpRequest<UpdateEntityRequest<UpdateEntityDTO<EntityModel>>, any, any, UpdateEntityRequestDefault>
  updateEntityUseCase: UpdateEntityUseCaseSpy<EntityModel>
}

const makeSut = (): sutTypes => {
  const validator = new RequestValidator()
  const updateEntityUseCase = new UpdateEntityUseCaseSpy<EntityModel>()
  const request = mockUpdateEntityRequest()
  const sut = new UpdateEntityController<EntityModel>(validator, updateEntityUseCase, 'id')
  return {
    sut,
    validator,
    request,
    updateEntityUseCase
  }
}

describe('UpdateEntityController', () => {
  test('Should call validator with correct value', async () => {
    const { sut, validator, request } = makeSut()
    const validateSpy = jest.spyOn(validator, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(Object(request.body))
  })

  test('Should return unprocessableEntity if validator fails', async () => {
    const { sut, validator, request } = makeSut()
    const error = new Error()
    jest.spyOn(validator, 'validate').mockReturnValue(error)
    const result = await sut.handle(request)
    expect(result).toEqual(unprocessableEntity(error))
  })

  test('Should call UpdateEntityUseCase with correct value', async () => {
    const { sut, updateEntityUseCase, request } = makeSut()
    const updateSpy = jest.spyOn(updateEntityUseCase, 'update')
    await sut.handle(request)
    expect(updateSpy).toHaveBeenCalledWith(request.params.id, request.body)
  })

  test('Should return conflict if UpdateEntityUseCase return EntityAlreadyExistsError', async () => {
    const { sut, updateEntityUseCase, request } = makeSut()
    const entityName = faker.database.column()
    jest.spyOn(updateEntityUseCase, 'update').mockImplementationOnce(() => { throw new EntityAlreadyExistsError(entityName) })
    const result = await sut.handle(request)
    expect(result).toEqual(conflict(new EntityAlreadyExistsError(entityName)))
  })

  test('Should return serverError if UpdateEntityUseCase return other error', async () => {
    const { sut, updateEntityUseCase, request } = makeSut()
    jest.spyOn(updateEntityUseCase, 'update').mockImplementationOnce(() => { throw new Error() })
    const result = await sut.handle(request)
    expect(result).toEqual(serverError(new Error()))
  })

  test('Should return Updated if UpdateEntityUseCase is succeeds', async () => {
    const { sut, updateEntityUseCase, request } = makeSut()
    const result = await sut.handle(request)
    expect(result).toEqual(ok(updateEntityUseCase.entity))
  })
})
