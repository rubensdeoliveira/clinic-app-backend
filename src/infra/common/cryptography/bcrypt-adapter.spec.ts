import { BCryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'
import { datatype } from 'faker'

const salt = 12
const makeSut = (): BCryptAdapter => {
  return new BCryptAdapter(salt)
}

describe('BCrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const valueToHash = datatype.string()
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt(valueToHash)
    expect(hashSpy).toHaveBeenCalledWith(valueToHash, salt)
  })

  test('Should return a hashed value on success', async () => {
    const valueToHash = datatype.string()
    const valueHashed = datatype.uuid()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { return valueHashed })
    const sut = makeSut()
    const hashedValue = await sut.encrypt(valueToHash)
    expect(hashedValue).toBe(valueHashed)
  })

  test('Should throw if bcrypt throws', async () => {
    const valueToHash = datatype.string()
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.encrypt(valueToHash)
    await expect(promise).rejects.toThrow()
  })
})
