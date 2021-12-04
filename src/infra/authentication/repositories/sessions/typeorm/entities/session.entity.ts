import 'module-alias/register'
import { Column, Entity } from 'typeorm'
import { SessionModel } from '@/domain/authentication'
import { DefaultEntity } from '@/infra/common/repositories'

@Entity('sessions')
export class SessionEntity extends DefaultEntity implements SessionModel {
  @Column('uuid')
  user_id: string
}
