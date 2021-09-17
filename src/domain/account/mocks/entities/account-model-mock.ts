import { AccountModel } from '@/domain/account/entities'
import { name, datatype, internet } from 'faker'

export const mockAccountModel = (): AccountModel => {
  return {
    id: datatype.uuid(),
    name: name.findName(),
    email: internet.email(),
    password: internet.password()
  }
}
