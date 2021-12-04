import { MemoryCreateAccessTokenUseCase } from './memory-create-access-token-use-case'
import { mockAccessTokenPayloadModel } from '@/domain/authentication'
import { EncryptWithSecretSpy } from '@/data/authentication/mocks'
import faker from 'faker'

type sutTypes = {
  sut: MemoryCreateAccessTokenUseCase
  accessTokenValidityInMinutes: number
  refreshTokenValidityInMinutes: number
  encryptWithSecret: EncryptWithSecretSpy
}

const makeSut = (): sutTypes => {
  const encryptWithSecret = new EncryptWithSecretSpy()
  const accessTokenValidityInMinutes = faker.datatype.number({ max: 1440 })
  const refreshTokenValidityInMinutes = faker.datatype.number({ max: 1440 })
  const sut = new MemoryCreateAccessTokenUseCase(accessTokenValidityInMinutes, refreshTokenValidityInMinutes)
  return {
    sut,
    accessTokenValidityInMinutes,
    refreshTokenValidityInMinutes,
    encryptWithSecret
  }
}

describe('MemoryCreateAccessTokenUseCase', () => {
  test('Should call EncryptWithSecret with correct values to create access token', async () => {
    const { sut, encryptWithSecret, accessTokenValidityInMinutes } = makeSut()
    const encryptSpy = jest.spyOn(encryptWithSecret, 'encrypt')
    const request = mockAccessTokenPayloadModel()
    await sut.create(request)
    expect(encryptSpy).toHaveBeenCalledWith({
      payload: request,
      subject: request.accountId
    }, `${accessTokenValidityInMinutes}m`)
  })

  test('Should call EncryptWithSecret with correct values to create refresh token', async () => {
    const { sut, encryptWithSecret, refreshTokenValidityInMinutes } = makeSut()
    const encryptSpy = jest.spyOn(encryptWithSecret, 'encrypt')
    const request = mockAccessTokenPayloadModel()
    await sut.create(request)
    expect(encryptSpy).toHaveBeenCalledWith({
      payload: request,
      subject: request.accountId
    }, `${refreshTokenValidityInMinutes}m`)
  })

  test('Should return a session if EncryptWithSecret is succeeds', async () => {
    const { sut, encryptWithSecret } = makeSut()
    const accessToken = faker.datatype.uuid()
    const refreshToken = faker.datatype.uuid()
    jest.spyOn(encryptWithSecret, 'encrypt').mockResolvedValueOnce(accessToken).mockResolvedValueOnce(refreshToken)
    const request = mockAccessTokenPayloadModel()
    const session = await sut.create(request)
    expect(session).toEqual({
      access_token: accessToken,
      refresh_token: refreshToken,
      user_type: request.userType
    })
  })
})
