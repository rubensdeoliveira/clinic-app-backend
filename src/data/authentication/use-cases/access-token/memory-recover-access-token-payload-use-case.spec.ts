import { MemoryRecoverAccessTokenPayloadUseCase } from './memory-recover-access-token-payload-use-case'
import { DecryptWithSecretSpy } from '@/data/authentication/mocks'
import { throwError } from '@/data/common/mocks'
import { InvalidCredentialsError } from '@/data/authentication/errors'
import faker from 'faker'

type sutTypes = {
  sut: MemoryRecoverAccessTokenPayloadUseCase
  decryptWithSecret: DecryptWithSecretSpy
}

const makeSut = (): sutTypes => {
  const decryptWithSecret = new DecryptWithSecretSpy()
  const sut = new MemoryRecoverAccessTokenPayloadUseCase(decryptWithSecret)
  return {
    sut,
    decryptWithSecret
  }
}

describe('MemoryRecoverAccessTokenPayloadUseCase', () => {
  test('Should call DecryptWithSecret with correct value', async () => {
    const { sut, decryptWithSecret } = makeSut()
    const token = faker.datatype.uuid()
    await sut.recover(token)
    expect(decryptWithSecret.token).toBe(token)
  })

  test('Should return InvalidCredentialsError if DecryptWithSecret throws a exception', async () => {
    const { sut, decryptWithSecret } = makeSut()
    jest.spyOn(decryptWithSecret, 'decrypt').mockImplementationOnce(throwError)
    const promise = sut.recover(faker.datatype.uuid())
    await expect(promise).rejects.toThrowError(InvalidCredentialsError)
  })

  test('Should return DecryptWithSecret payload if succeeds', async () => {
    const { sut, decryptWithSecret } = makeSut()
    const result = await sut.recover(faker.datatype.uuid())
    expect(result).toEqual(decryptWithSecret.decryptedModel.payload)
  })
})
