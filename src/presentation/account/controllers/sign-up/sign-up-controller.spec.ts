import { SignUpController } from './sign-up-controller'
import { MissingParamError, InvalidParamError, ServerError } from '../../../common/errors'
import { EmailValidator } from '../../protocols'
import { AddAccountUseCase } from '@/domain/account/use-cases'
import { AccountModel, AddAccountDTO } from '@/domain/account/entities'
import { mockAccountModel, mockAddAccountDTO } from '../../../../domain/account/mocks'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorSpy implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorSpy()
}

const accountModel = mockAccountModel()
const makeAddAccount = (): AddAccountUseCase => {
  class AddAccountSpy implements AddAccountUseCase {
    async add (account: AddAccountDTO): Promise<AccountModel> {
      return new Promise(resolve => resolve(accountModel))
    }
  }
  return new AddAccountSpy()
}

type SutTypes = {
  sut: SignUpController
  emailValidatorSpy: EmailValidator
  addAccountUseCaseSpy: AddAccountUseCase
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = makeEmailValidator()
  const addAccountUseCaseSpy = makeAddAccount()
  const sut = new SignUpController(emailValidatorSpy, addAccountUseCaseSpy)
  return {
    sut,
    emailValidatorSpy,
    addAccountUseCaseSpy
  }
}

describe('SignUpController', () => {
  test('should render 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const { name,...account } = mockAddAccountDTO()
    const httpRequest = {
      body: account
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('should render 400 if no email is provided',async () => {
    const { sut } = makeSut()
    const { email,...account } = mockAddAccountDTO()
    const httpRequest = {
      body: account
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('should render 400 if no password is provided',async () => {
    const { sut } = makeSut()
    const { password, ...account } = mockAddAccountDTO()
    const httpRequest = {
      body: account
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('should render 400 if no password confirmation is provided',async () => {
    const { sut } = makeSut()
    const { passwordConfirmation,...account } = mockAddAccountDTO()
    const httpRequest = {
      body: account
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('should render 400 if password confirmation fails',async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: mockAddAccountDTO()
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  test('should render 400 if an invalid email is provided',async () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: accountModel.name,
        email: 'invalid_email',
        password: accountModel.password,
        passwordConfirmation: accountModel.password
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('should call EmailValidator with correct email',async () => {
    const { sut, emailValidatorSpy } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorSpy, 'isValid')
    const httpRequest = {
      body: {
        name: accountModel.name,
        email: accountModel.email,
        password: accountModel.password,
        passwordConfirmation: accountModel.password
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(accountModel.email)
  })

  test('should render 500 email validator throws a error',async () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: accountModel.name,
        email: accountModel.email,
        password: accountModel.password,
        passwordConfirmation: accountModel.password
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('should call AddAccount with correct values',async () => {
    const { sut, addAccountUseCaseSpy } = makeSut()
    const addSpy = jest.spyOn(addAccountUseCaseSpy, 'add')
    const { id, ...accountModelWithoutId } = accountModel
    const httpRequest = {
      body: {
        name: accountModel.name,
        email: accountModel.email,
        password: accountModel.password,
        passwordConfirmation: accountModel.password
      }
    }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(accountModelWithoutId)
  })

  test('should render 500 if AddAccountUseCase throws',async () => {
    const { sut, addAccountUseCaseSpy } = makeSut()
    jest.spyOn(addAccountUseCaseSpy, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        name: accountModel.name,
        email: accountModel.email,
        password: accountModel.password,
        passwordConfirmation: accountModel.password
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('should return 200 if valid data is provided',async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: accountModel.name,
        email: accountModel.email,
        password: accountModel.password,
        passwordConfirmation: accountModel.password
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(accountModel)
  })
})
