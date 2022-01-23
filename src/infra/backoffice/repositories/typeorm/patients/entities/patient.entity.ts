import { PatientGender } from '../../../../../../domain/backoffice/constants'

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('patients')
export class PatientEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  phone: string

  @Column()
  admin_id: string

  @Column()
  email: string

  @Column({
    type: 'enum',
    enum: PatientGender,
  })
  gender: PatientGender

  @Column()
  birthdate: Date

  @Column()
  cpf: string

  @Column()
  occupation: string

  @Column()
  emergency_contact: string

  @Column()
  emergency_phone: string

  @Column()
  more_info: string

  @Column()
  neighborhood: string

  @Column()
  city: string

  @Column()
  address: string

  @Column()
  state: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
