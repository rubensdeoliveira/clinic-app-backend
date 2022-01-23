import { PatientsRepository } from '@/infra/backoffice/repositories/typeorm'

export const makePatientsRepository = (): PatientsRepository => {
  return new PatientsRepository()
}
