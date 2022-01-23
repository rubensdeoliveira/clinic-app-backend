import { EntityModel } from '@/domain/common/entities'
import { PatientGender } from '@/domain/backoffice/constants'

export type PatientModel = EntityModel & {
  name: string
  phone: string
  admin_id: string
  gender: PatientGender
  email?: string
  birthdate?: Date
  cpf?: string
  occupation?: string
  emergency_contact?: string
  emergency_phone?: string
  more_info?: string
  neighborhood?: string
  city?: string
  address?: string
  state?: string
}
