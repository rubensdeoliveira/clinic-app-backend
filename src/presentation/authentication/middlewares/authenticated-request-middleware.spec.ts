import { AuthenticatedRequestMiddleware } from './authenticated-request-middleware'
import { UserType, ValidateSessionByIdUseCaseSpy } from '@/domain/authentication'
import { mockAuthenticatedMiddlewareRequest } from '@/presentation/auth/mocks'
import { forbidden } from '@/presentation/common/protocols'
import { AccessDeniedError } from '@/presentation/authentication/errors'
import { RequestValidator } from '@/validation/validations'
import { SessionNotFoundError } from '@/data/authentication/errors'
import faker from 'faker'

type sutTypes = {
  sut: AuthenticatedRequestMiddleware
  requestValidator: RequestValidator
  validateSessionByIdUseCase: ValidateSessionByIdUseCaseSpy
}

const makeSut = (userTypesWithAccess: UserType[] = []): sutTypes => {
  const validateSessionByIdUseCase = new ValidateSessionByIdUseCaseSpy()
  const requestValidator = new RequestValidator()
  const sut = new AuthenticatedRequestMiddleware(requestValidator, validateSessionByIdUseCase, userTypesWithAccess)
  return {
    sut,
    requestValidator,
    validateSessionByIdUseCase
  }
}

describe('AuthenticatedRequestMiddleware', () => {
  test('Should call RequestValidator with correct value', async () => {
    const { sut, requestValidator } = makeSut()
    const request = mockAuthenticatedMiddlewareRequest()
    const validateSpy = jest.spyOn(requestValidator, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request.headers)
  })

  test('Should return forbidden status code if RequestValidator fails', async () => {
    const { sut, requestValidator } = makeSut()
    const errors = faker.random.objectElement<object>()
    jest.spyOn(requestValidator, 'validate').mockReturnValue(errors)
    const response = await sut.handle(mockAuthenticatedMiddlewareRequest())
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })

  test.skip('Should call RecoverAccessTokenPayloadUseCase with correct value', async () => {
    // const { sut, recoverAccessTokenPayloadUseCase } = makeSut()
    // const request = mockAuthenticatedMiddlewareRequest()
    // await sut.handle(request)
    // expect(recoverAccessTokenPayloadUseCase.token).toEqual(request.headers.token)
  })

  test.skip('Should return Unprocessable Entity status code if RecoverAccessTokenPayloadUseCase return an exception', async () => {
    // const { sut, recoverAccessTokenPayloadUseCase } = makeSut()
    // jest.spyOn(recoverAccessTokenPayloadUseCase, 'recover').mockImplementationOnce(() => { throw new InvalidCredentialsError() })
    // const response = await sut.handle(mockAuthenticatedMiddlewareRequest())
    // expect(response).toEqual(unprocessableEntity(new InvalidCredentialsError()))
  })

  test.skip('Should return forbidden status code if RecoverAccessTokenPayloadUseCase return an account without access', async () => {
    // const userTypeToValidation = mockUserType()
    // const { sut, recoverAccessTokenPayloadUseCase } = makeSut([userTypeToValidation])
    // const accessToken = mockAccessTokenPayloadModel()
    // while (userTypeToValidation === accessToken.userType) {
    //   accessToken.userType = mockUserType()
    // }
    // jest.spyOn(recoverAccessTokenPayloadUseCase, 'recover').mockResolvedValue(accessToken)
    // const response = await sut.handle(mockAuthenticatedMiddlewareRequest())
    // expect(response).toEqual(forbidden(new AccessDeniedError()))
  })

  test.skip('Should call ValidateSessionByIdUseCase with correct value', async () => {
    // const { sut, recoverAccessTokenPayloadUseCase, validateSessionByIdUseCase } = makeSut()
    // await sut.handle(mockAuthenticatedMiddlewareRequest())
    // expect(validateSessionByIdUseCase.sessionId).toBe(recoverAccessTokenPayloadUseCase.accessTokenPayload.sessionId)
  })

  test('Should return forbidden status code if ValidateSessionByIdUseCase return undefined', async () => {
    const { sut, validateSessionByIdUseCase } = makeSut()
    validateSessionByIdUseCase.session = undefined
    const response = await sut.handle(mockAuthenticatedMiddlewareRequest())
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return forbidden status code if ValidateSessionByIdUseCase return SessionNotFoundError', async () => {
    const { sut, validateSessionByIdUseCase } = makeSut()
    jest.spyOn(validateSessionByIdUseCase, 'validate').mockImplementationOnce(() => { throw new SessionNotFoundError() })
    const response = await sut.handle(mockAuthenticatedMiddlewareRequest())
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return Ok status code if ValidateSessionByIdUseCase is succeeds and return an account with access', async () => {
    // const userTypeToValidation = mockUserType()
    // const { sut, recoverAccessTokenPayloadUseCase } = makeSut([userTypeToValidation])
    // const accessToken = mockAccessTokenPayloadModel()
    // while (userTypeToValidation !== accessToken.userType) {
    //   accessToken.userType = mockUserType()
    // }
    // jest.spyOn(recoverAccessTokenPayloadUseCase, 'recover').mockResolvedValue(accessToken)
    // const response = await sut.handle(mockAuthenticatedMiddlewareRequest())
    // expect(response).toEqual(ok<object>({
    //   access_token: accessToken
    // }))
  })
})
