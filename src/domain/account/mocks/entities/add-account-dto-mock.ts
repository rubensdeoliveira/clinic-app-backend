import { AddAccountDTO } from '@/domain/account/entities'
import { name, internet } from 'faker'

export const mockAddAccountDTO = (): AddAccountDTO => {
  const password = internet.password()
  return {
    name: name.findName(),
    email: internet.email(),
    password
  }
}
