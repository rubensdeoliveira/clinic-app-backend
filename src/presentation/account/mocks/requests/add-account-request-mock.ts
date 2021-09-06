import { mockAddAccountDTO } from '../../../../domain/account/mocks'
import { AddAccountRequest } from '@/presentation/account/requests'

type AddAccountRequestMockProps = {
  body: AddAccountRequest
}

export const mockAddAccountRequest = (): AddAccountRequestMockProps => {
  const addAccountDTO = mockAddAccountDTO()
  return {
    body: {
      ...addAccountDTO,
      password_confirmation: addAccountDTO.password
    }
  }
}
