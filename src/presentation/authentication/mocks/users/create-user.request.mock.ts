import { CreateUserRequest } from '@/presentation/authentication/requests'
import { HttpRequest } from '@/presentation/common/protocols'
import { mockCreateUserDTO } from '@/domain/authentication'

export const mockCreateUserRequest = (): HttpRequest<CreateUserRequest> => {
  const createDTO = mockCreateUserDTO()
  return {
    body: {
      ...createDTO,
      password_confirmation: createDTO.password
    }
  }
}
