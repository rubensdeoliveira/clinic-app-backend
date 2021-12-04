import { ListEntitiesController } from './list-entities-controller'
import { ListEntitiesUseCaseSpy, GetCustomFilterUseCaseSpy, mockCustomFilterConditionalModel, mockCustomFilterOperatorModel } from '@/domain/common'
import { mockListEntitiesRequest } from '@/presentation/common/mocks'
import { ok, serverError } from '@/presentation/common/protocols'
import faker from 'faker'

type sutTypes = {
  sut: ListEntitiesController
  getCustomFilterUseCase: GetCustomFilterUseCaseSpy
  listEntitiesUseCase: ListEntitiesUseCaseSpy
}

const makeSut = (): sutTypes => {
  const listEntitiesUseCase = new ListEntitiesUseCaseSpy()
  const getCustomFilterUseCase = new GetCustomFilterUseCaseSpy()
  const sut = new ListEntitiesController(getCustomFilterUseCase, listEntitiesUseCase)
  return {
    sut,
    getCustomFilterUseCase,
    listEntitiesUseCase
  }
}

describe('ListEntitiesController', () => {
  describe('Call GetCustomFilterUseCase', () => {
    test('Should call GetCustomFilterUseCase with correct value if all filters is provided', async () => {
      const { sut, getCustomFilterUseCase } = makeSut()
      const request = mockListEntitiesRequest()
      await sut.handle(request)
      const { f, c, o, v } = request.queryParams
      expect(getCustomFilterUseCase.params).toEqual({
        f, c, o, v
      })
    })

    test('Should call GetCustomFilterUseCase with correct value if f is not provided', async () => {
      const { sut, getCustomFilterUseCase } = makeSut()
      const request = mockListEntitiesRequest()
      delete request.queryParams.f
      await sut.handle(request)
      const { c, o, v } = request.queryParams
      expect(getCustomFilterUseCase.params).toEqual({
        f: [], c, o, v
      })
    })

    test('Should call GetCustomFilterUseCase with correct value if f is a string', async () => {
      const { sut, getCustomFilterUseCase } = makeSut()
      const request = mockListEntitiesRequest()
      request.queryParams.f = faker.datatype.uuid()
      await sut.handle(request)
      const { f, c, o, v } = request.queryParams
      expect(getCustomFilterUseCase.params).toEqual({
        f: [f], c, o, v
      })
    })

    test('Should call GetCustomFilterUseCase with correct value if c is not provided', async () => {
      const { sut, getCustomFilterUseCase } = makeSut()
      const request = mockListEntitiesRequest()
      delete request.queryParams.c
      await sut.handle(request)
      const { f, o, v } = request.queryParams
      expect(getCustomFilterUseCase.params).toEqual({
        f, c: [], o, v
      })
    })

    test('Should call GetCustomFilterUseCase with correct value if c a string', async () => {
      const { sut, getCustomFilterUseCase } = makeSut()
      const request = mockListEntitiesRequest()
      request.queryParams.c = mockCustomFilterConditionalModel()
      await sut.handle(request)
      const { f, o, v, c } = request.queryParams
      expect(getCustomFilterUseCase.params).toEqual({
        f, c: [c], o, v
      })
    })

    test('Should call GetCustomFilterUseCase with correct value if o is not provided', async () => {
      const { sut, getCustomFilterUseCase } = makeSut()
      const request = mockListEntitiesRequest()
      delete request.queryParams.o
      await sut.handle(request)
      const { f, c, v } = request.queryParams
      expect(getCustomFilterUseCase.params).toEqual({
        f, c, o: [], v
      })
    })

    test('Should call GetCustomFilterUseCase with correct value if o is a string', async () => {
      const { sut, getCustomFilterUseCase } = makeSut()
      const request = mockListEntitiesRequest()
      request.queryParams.o = mockCustomFilterOperatorModel()
      await sut.handle(request)
      const { f, c, v, o } = request.queryParams
      expect(getCustomFilterUseCase.params).toEqual({
        f, c, o: [o], v
      })
    })

    test('Should call GetCustomFilterUseCase with correct value if v is not provided', async () => {
      const { sut, getCustomFilterUseCase } = makeSut()
      const request = mockListEntitiesRequest()
      delete request.queryParams.v
      await sut.handle(request)
      const { f, o, c } = request.queryParams
      expect(getCustomFilterUseCase.params).toEqual({
        f, c, o, v: []
      })
    })

    test('Should call GetCustomFilterUseCase with correct value if v is a string', async () => {
      const { sut, getCustomFilterUseCase } = makeSut()
      const request = mockListEntitiesRequest()
      request.queryParams.v = faker.datatype.uuid()
      await sut.handle(request)
      const { f, o, c, v } = request.queryParams
      expect(getCustomFilterUseCase.params).toEqual({
        f, c, o, v: [v]
      })
    })
  })

  test('Should call ListEntitiesUseCase with correct value', async () => {
    const { sut, listEntitiesUseCase, getCustomFilterUseCase } = makeSut()
    const request = mockListEntitiesRequest()
    await sut.handle(request)
    expect(listEntitiesUseCase.filter).toEqual({
      page: request.queryParams.page,
      textToSearch: request.queryParams.search,
      recordsPerPage: request.queryParams.size,
      orderColumn: request.queryParams.order,
      orderDirection: request.queryParams.direction,
      filters: getCustomFilterUseCase.filters
    })
  })

  test('Should return serverError if ListEntitiesUseCase return expcetion', async () => {
    const { sut, listEntitiesUseCase } = makeSut()
    jest.spyOn(listEntitiesUseCase, 'list').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(mockListEntitiesRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return ok if ListEntitiesUseCase is succeeds', async () => {
    const { sut, listEntitiesUseCase } = makeSut()
    const response = await sut.handle(mockListEntitiesRequest())
    expect(response).toEqual(ok(listEntitiesUseCase.entities))
  })
})
