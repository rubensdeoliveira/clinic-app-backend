import { DbRequestRecoverPasswordUseCase } from './db-request-recover-password-use-case'
import { Set2FactorSecretInUserAccountUseCaseSpy } from '@/domain/authentication'
import { Create2FactorTokenSpy, GetUserByEmailRepositorySpy } from '@/data/authentication/mocks'
import { InvalidCredentialsError } from '@/data/authentication/errors'
import { HtmlTemplateParseSpy, mockContactModel, SendMailSpy } from '@/data/common/mocks'
import { ContactModel } from '@/data/common/protocols'
import faker from 'faker'

type sutTypes = {
  sut: DbRequestRecoverPasswordUseCase
  getUserAccountByEmailRepository: GetUserByEmailRepositorySpy
  set2FactorSecretInUserAccountUseCase: Set2FactorSecretInUserAccountUseCaseSpy
  create2FactorToken: Create2FactorTokenSpy
  requestRecoverPasswordEmailFilePath: string
  htmlTemplateParse: HtmlTemplateParseSpy
  senderMail: ContactModel
  sendMail: SendMailSpy
}

const makeSut = (): sutTypes => {
  const getUserAccountByEmailRepository = new GetUserByEmailRepositorySpy()
  const set2FactorSecretInUserAccountUseCase = new Set2FactorSecretInUserAccountUseCaseSpy()
  const create2FactorToken = new Create2FactorTokenSpy()
  const requestRecoverPasswordEmailFilePath = faker.system.filePath()
  const htmlTemplateParse = new HtmlTemplateParseSpy()
  const senderMail = mockContactModel()
  const sendMail = new SendMailSpy()
  const sut = new DbRequestRecoverPasswordUseCase(
    getUserAccountByEmailRepository,
    set2FactorSecretInUserAccountUseCase,
    create2FactorToken,
    requestRecoverPasswordEmailFilePath,
    htmlTemplateParse,
    senderMail,
    sendMail)
  return {
    sut,
    getUserAccountByEmailRepository,
    set2FactorSecretInUserAccountUseCase,
    create2FactorToken,
    requestRecoverPasswordEmailFilePath,
    htmlTemplateParse,
    senderMail,
    sendMail
  }
}

describe('DbRequestRecoverPasswordUseCase', () => {
  test('Should call GetUserByEmailRepository with correct value', async () => {
    const { sut, getUserAccountByEmailRepository } = makeSut()
    const email = faker.internet.email()
    await sut.request(email)
    expect(getUserAccountByEmailRepository.email).toBe(email)
  })

  test('Should return InvalidCredentialsError if GetUserByEmailRepository return undefined', async () => {
    const { sut, getUserAccountByEmailRepository } = makeSut()
    getUserAccountByEmailRepository.account = undefined
    const promise = sut.request(faker.internet.email())
    await expect(promise).rejects.toThrowError(InvalidCredentialsError)
  })

  test('Should call Set2FactorSecretInUserAccountUseCase with correct value', async () => {
    const { sut, getUserAccountByEmailRepository, set2FactorSecretInUserAccountUseCase } = makeSut()
    await sut.request(faker.internet.email())
    expect(set2FactorSecretInUserAccountUseCase.account).toEqual(getUserAccountByEmailRepository.account)
  })

  test('Should return a exception if Set2FactorSecretInUserAccountUseCase return a exception', async () => {
    const { sut, set2FactorSecretInUserAccountUseCase } = makeSut()
    jest.spyOn(set2FactorSecretInUserAccountUseCase, 'setSecret').mockImplementationOnce(() => { throw new InvalidCredentialsError() })
    const promise = sut.request(faker.internet.email())
    await expect(promise).rejects.toThrowError(InvalidCredentialsError)
  })

  test('Should call Create2FactorToken with correct value', async () => {
    const { sut, set2FactorSecretInUserAccountUseCase, create2FactorToken } = makeSut()
    await sut.request(faker.internet.email())
    expect(create2FactorToken.secret).toBe(set2FactorSecretInUserAccountUseCase.updatedAccount.secret_2factor)
  })

  test('Should call HtmlTemplateParse with correct value', async () => {
    const { sut, set2FactorSecretInUserAccountUseCase, create2FactorToken, htmlTemplateParse, requestRecoverPasswordEmailFilePath } = makeSut()
    await sut.request(faker.internet.email())
    expect(htmlTemplateParse.params).toEqual({
      filePath: requestRecoverPasswordEmailFilePath,
      variables: {
        token: create2FactorToken.token,
        name: set2FactorSecretInUserAccountUseCase.updatedAccount.name,
        email: set2FactorSecretInUserAccountUseCase.updatedAccount.email
      }
    })
  })

  test('Should call SendMail with correct value', async () => {
    const { sut, set2FactorSecretInUserAccountUseCase, htmlTemplateParse, senderMail, sendMail } = makeSut()
    await sut.request(faker.internet.email())
    expect(sendMail.params).toEqual({
      sender: senderMail,
      to: {
        name: set2FactorSecretInUserAccountUseCase.updatedAccount.name,
        email: set2FactorSecretInUserAccountUseCase.updatedAccount.email
      },
      subject: 'Request Recover Password',
      content: htmlTemplateParse.result
    })
  })
})
