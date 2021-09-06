import { EmailValidator } from '@/presentation/account/protocols'

export class EmailValidatorSpy implements EmailValidator {
  email: string

  isValid (email: string): boolean {
    this.email = email
    return true
  }
}
