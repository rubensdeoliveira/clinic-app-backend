import { EntityModel } from '@/domain/common/entities'

export type AccountModel = EntityModel & {
  name: string
  email: string
  type: string
  password: string
  admin_id?: string
}
