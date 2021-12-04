import { EntityModel } from '@/domain/common'

export type SessionModel = EntityModel & {
  user_id: string
}
