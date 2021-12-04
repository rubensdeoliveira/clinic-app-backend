import { UserModel, UpdateEmailAndTypeUserByIdDTO } from '@/domain/authentication'

export interface UpdateEmailAndTypeUserByIdUseCase {
  updateEmailById: (params: UpdateEmailAndTypeUserByIdDTO) => Promise<UserModel>
}
