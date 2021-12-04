import 'module-alias/register'
import { Column, Entity } from 'typeorm'
import { UserModel, UserTypeModel, UserStatusModel } from '@/domain/authentication'
import { DefaultEntity } from '@/infra/common/repositories'

@Entity('users')
export class UserEntity extends DefaultEntity implements UserModel {
  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: UserTypeModel
  })
  type: UserTypeModel

  @Column({
    type: 'enum',
    enum: UserStatusModel
  })
  status: UserStatusModel
}
