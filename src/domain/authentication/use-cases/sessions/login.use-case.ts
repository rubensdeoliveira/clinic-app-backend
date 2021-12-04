import { AccessTokenModel, LoginDTO } from '@/domain/authentication'

export interface LoginUseCase {
  login: (params: LoginDTO) => Promise<AccessTokenModel>
}
