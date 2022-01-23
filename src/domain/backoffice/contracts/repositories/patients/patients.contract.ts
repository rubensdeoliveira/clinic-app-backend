import { CreatePatientDTO, UpdatePatientDTO } from '@/domain/backoffice/dtos'
import { PatientModel } from '@/domain/backoffice/entities'

export interface CreatePatientContract {
  create: (
    input: CreatePatientContract.Input,
  ) => Promise<CreatePatientContract.Output>
}

export namespace CreatePatientContract {
  export type Input = CreatePatientDTO
  export type Output = PatientModel
}

export interface UpdatePatientByIdContract {
  updateById: (
    input: UpdatePatientByIdContract.Input,
  ) => Promise<UpdatePatientByIdContract.Output>
}

export namespace UpdatePatientByIdContract {
  export type Input = UpdatePatientDTO
  export type Output = PatientModel
}

export interface DeletePatientByIdContract {
  deleteById: (input: DeletePatientByIdContract.Input) => Promise<void>
}

export namespace DeletePatientByIdContract {
  export type Input = { id: string }
}

export interface ListPatientsContract {
  list: (
    input: ListPatientsContract.Input,
  ) => Promise<ListPatientsContract.Output>
}

export namespace ListPatientsContract {
  export type Input = { page: number; admin_id: string }
  export type Output = PatientModel[]
}

export interface GetPatientByEmailAndAdminIdContract {
  getByEmailAndAdminId: (
    input: GetPatientByEmailAndAdminIdContract.Input,
  ) => Promise<GetPatientByEmailAndAdminIdContract.Output>
}

export namespace GetPatientByEmailAndAdminIdContract {
  export type Input = { email: string; admin_id: string }
  export type Output = undefined | PatientModel
}

export interface GetPatientByCpfAndAdminIdContract {
  getByCpfAndAdminId: (
    input: GetPatientByCpfAndAdminIdContract.Input,
  ) => Promise<GetPatientByCpfAndAdminIdContract.Output>
}

export namespace GetPatientByCpfAndAdminIdContract {
  export type Input = { cpf: string; admin_id: string }
  export type Output = undefined | PatientModel
}

export interface GetPatientByIdContract {
  getById: (
    input: GetPatientByIdContract.Input,
  ) => Promise<GetPatientByIdContract.Output>
}

export namespace GetPatientByIdContract {
  export type Input = { id: string }
  export type Output = undefined | PatientModel
}
