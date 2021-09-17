import { AddAccountDTO } from '@/domain/account/entities'
import { name, internet } from 'faker'

export const mockAddAccountDTO = (): AddAccountDTO => {
  return {
    name: name.findName(),
    email: internet.email(),
    password: internet.password()
  }
}
