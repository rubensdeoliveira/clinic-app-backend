import { AccountModel } from '@/domain/account/entities'
import { DefaultEntity } from '@/infra/common/repositories'
import { Column, Entity } from 'typeorm'

@Entity('accounts')
export class AccountEntity extends DefaultEntity implements AccountModel {
  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string
}
