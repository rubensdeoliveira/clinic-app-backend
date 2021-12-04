import { ListEntitiesWithAccessTokenController } from './list-entities-with-access-token-controller'
import { ListEntitiesWithAccessTokenUseCaseSpy } from '@/domain/authentication'
import { RequestValidator } from '@/validation/validations'
import { AccessDeniedError } from '@/data/authentication/errors'
import { forbidden, ok, serverError, unprocessableEntity } from '@/presentation/common/protocols'
import { mockListEntitiesWithAccessTokenRequest } from '@/presentation/auth/mocks'
import { EntityModel, GetCustomFilterUseCaseSpy, mockCustomFilterConditionalModel, mockCustomFilterOperatorModel } from '@/domain/common'
import faker from 'faker'

type sutTypes = {
  sut: ListEntitiesWithAccessTokenController<EntityModel>
  requestValidator: RequestValidator
  getCustomFilterUseCase: GetCustomFilterUseCaseSpy
  listEntitiesWithAccessTokenUseCase: ListEntitiesWithAccessTokenUseCaseSpy<EntityModel>
}

const makeSut = (): sutTypes => {
  const requestValidator = new RequestValidator()
  const getCustomFilterUseCase = new GetCustomFilterUseCaseSpy()
  const listEntitiesWithAccessTokenUseCase = new ListEntitiesWithAccessTokenUseCaseSpy<EntityModel>()
  const sut = new ListEntitiesWithAccessTokenController(requestValidator, getCustomFilterUseCase, listEntitiesWithAccessTokenUseCase)
  return {
    sut,
    requestValidator,
    getCustomFilterUseCase,
    listEntitiesWithAccessTokenUseCase
  }
}

describe('ListEntitiesWithAccessTokenController', () => {
  test('Should call RequestValidator with correct value', async () => {
    const { sut, requestValidator } = makeSut()
    const request = mockListEntitiesWithAccessTokenRequest()
    const validateSpy = jest.spyOn(requestValidator, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.body.access_token)
  })

  test('Should return unprocessableEntity if RequestValidator fails', async () => {
    const { sut, requestValidator } = makeSut()
    const errors = faker.random.objectElement<object>()
    jest.spyOn(requestValidator, 'validate').mockReturnValue(errors)
    const response = await sut.handle(mockListEntitiesWithAccessTokenRequest())
    expect(response).toEqual(unprocessableEntity(errors))
  })

  describe('Call GetCustomFilterUseCase', () => {
    test('Should call GetCustomFilterUseCase with correct value if all filters is provided', async () => {
      const { sut, getCustomFilterUseCase } = makeSut()
      const request = mockListEntitiesWithAccessTokenRequest()
      await sut.handle(request)
      const { f, c, o, v } = request.queryParams
      expect(getCustomFilterUseCase.params).toEqual({
        f, c, o, v
      })
    })

    test('Should call GetCustomFilterUseCase with correct value if f is not provided', async () => {
      const { sut, getCustomFilterUseCase } = makeSut()
      const request = mockListEntitiesWithAccessTokenRequest()
      delete request.queryParams.f
      await sut.handle(request)
      const { c, o, v } = request.queryParams
      expect(getCustomFilterUseCase.params).toEqual({
        f: [], c, o, v
      })
    })

    test('Should call GetCustomFilterUseCase with correct value if f is a string', async () => {
      const { sut, getCustomFilterUseCase } = makeSut()
      const request = mockListEntitiesWithAccessTokenRequest()
      request.queryParams.f = faker.datatype.uuid()
      await sut.handle(request)
      const { f, c, o, v } = request.queryParams
      expect(getCustomFilterUseCase.params).toEqual({
        f: [f], c, o, v
      })
    })

    test('Should call GetCustomFilterUseCase with correct value if c is not provided', async () => {
      const { sut, getCustomFilterUseCase } = makeSut()
      const request = mockListEntitiesWithAccessTokenRequest()
      delete request.queryParams.c
      await sut.handle(request)
      const { f, o, v } = request.queryParams
      expect(getCustomFilterUseCase.params).toEqual({
        f, c: [], o, v
      })
    })

    test('Should call GetCustomFilterUseCase with correct value if c a string', async () => {
      const { sut, getCustomFilterUseCase } = makeSut()
      const request = mockListEntitiesWithAccessTokenRequest()
      request.queryParams.c = mockCustomFilterConditionalModel()
      await sut.handle(request)
      const { f, o, v, c } = request.queryParams
      expect(getCustomFilterUseCase.params).toEqual({
        f, c: [c], o, v
      })
    })

    test('Should call GetCustomFilterUseCase with correct value if o is not provided', async () => {
      const { sut, getCustomFilterUseCase } = makeSut()
      const request = mockListEntitiesWithAccessTokenRequest()
      delete request.queryParams.o
      await sut.handle(request)
      const { f, c, v } = request.queryParams
      expect(getCustomFilterUseCase.params).toEqual({
        f, c, o: [], v
      })
    })

    test('Should call GetCustomFilterUseCase with correct value if o is a string', async () => {
      const { sut, getCustomFilterUseCase } = makeSut()
      const request = mockListEntitiesWithAccessTokenRequest()
      request.queryParams.o = mockCustomFilterOperatorModel()
      await sut.handle(request)
      const { f, c, v, o } = request.queryParams
      expect(getCustomFilterUseCase.params).toEqual({
        f, c, o: [o], v
      })
    })

    test('Should call GetCustomFilterUseCase with correct value if v is not provided', async () => {
      const { sut, getCustomFilterUseCase } = makeSut()
      const request = mockListEntitiesWithAccessTokenRequest()
      delete request.queryParams.v
      await sut.handle(request)
      const { f, o, c } = request.queryParams
      expect(getCustomFilterUseCase.params).toEqual({
        f, c, o, v: []
      })
    })

    test('Should call GetCustomFilterUseCase with correct value if v is a string', async () => {
      const { sut, getCustomFilterUseCase } = makeSut()
      const request = mockListEntitiesWithAccessTokenRequest()
      request.queryParams.v = faker.datatype.uuid()
      await sut.handle(request)
      const { f, o, c, v } = request.queryParams
      expect(getCustomFilterUseCase.params).toEqual({
        f, c, o, v: [v]
      })
    })
  })

  test('Should call listEntitiesWithAccessTokenUseCase with correct value', async () => {
    const { sut, listEntitiesWithAccessTokenUseCase, getCustomFilterUseCase } = makeSut()
    const request = mockListEntitiesWithAccessTokenRequest()
    await sut.handle(request)
    expect(listEntitiesWithAccessTokenUseCase.filter).toEqual({
      page: request.queryParams.page,
      textToSearch: request.queryParams.search,
      recordsPerPage: request.queryParams.size,
      orderColumn: request.queryParams.order,
      orderDirection: request.queryParams.direction,
      filters: getCustomFilterUseCase.filters
    })
    expect(listEntitiesWithAccessTokenUseCase.accessToken).toEqual(request.body.access_token)
  })

  test('Should return forbidden error if listEntitiesWithAccessTokenUseCase return ProfileIsNotFoundError', async () => {
    const { sut, listEntitiesWithAccessTokenUseCase } = makeSut()
    jest.spyOn(listEntitiesWithAccessTokenUseCase, 'list').mockImplementationOnce(() => { throw new AccessDeniedError() })
    const response = await sut.handle(mockListEntitiesWithAccessTokenRequest())
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return serverError if listEntitiesWithAccessTokenUseCase return other expcetion', async () => {
    const { sut, listEntitiesWithAccessTokenUseCase } = makeSut()
    jest.spyOn(listEntitiesWithAccessTokenUseCase, 'list').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(mockListEntitiesWithAccessTokenRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return ok if listEntitiesWithAccessTokenUseCase is succeeds', async () => {
    const { sut, listEntitiesWithAccessTokenUseCase } = makeSut()
    const response = await sut.handle(mockListEntitiesWithAccessTokenRequest())
    expect(response).toEqual(ok(listEntitiesWithAccessTokenUseCase.entities))
  })
})
