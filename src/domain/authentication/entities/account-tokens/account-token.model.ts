import { EntityModel } from '@/domain/common/entities'

export type AccountTokenModel = EntityModel & {
  account_id: string
  refresh_token: string
  expires_date: Date
}
