import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { AccountEntity } from '../../accounts/entities'

@Entity('account_tokens')
export class AccountTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  account_id: string

  @ManyToOne(() => AccountEntity)
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity

  @Column()
  refresh_token: string

  @Column()
  expires_date: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
