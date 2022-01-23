import { PatientEntity } from '@/infra/backoffice/repositories/typeorm'
import { TypeormRepository } from '@/infra/common/repositories/typeorm'
import {
  CreatePatientContract,
  UpdatePatientByIdContract,
  DeletePatientByIdContract,
  ListPatientsContract,
  GetPatientByEmailAndAdminIdContract,
  GetPatientByCpfAndAdminIdContract,
  GetPatientByIdContract,
} from '@/domain/backoffice/contracts'

export class PatientsRepository
  extends TypeormRepository
  implements
    CreatePatientContract,
    UpdatePatientByIdContract,
    DeletePatientByIdContract,
    ListPatientsContract,
    GetPatientByEmailAndAdminIdContract,
    GetPatientByCpfAndAdminIdContract,
    GetPatientByIdContract
{
  async create(
    data: CreatePatientContract.Input,
  ): Promise<CreatePatientContract.Output> {
    const patientsRepository = this.getRepository(PatientEntity)
    const patientEntity = patientsRepository.create(data)
    return patientsRepository.save(patientEntity)
  }

  async updateById(
    data: UpdatePatientByIdContract.Input,
  ): Promise<UpdatePatientByIdContract.Output> {
    const patientsRepository = this.getRepository(PatientEntity)
    return patientsRepository.save(data)
  }

  async deleteById({ id }: DeletePatientByIdContract.Input): Promise<void> {
    const patientsRepository = this.getRepository(PatientEntity)
    await patientsRepository.delete(id)
  }

  async list({
    page,
    admin_id,
  }: ListPatientsContract.Input): Promise<ListPatientsContract.Output> {
    const patientsRepository = this.getRepository(PatientEntity)
    const patientsList = patientsRepository.find({ where: { admin_id } })
    return patientsList
  }

  async getByEmailAndAdminId({
    admin_id,
    email,
  }: GetPatientByEmailAndAdminIdContract.Input): Promise<GetPatientByEmailAndAdminIdContract.Output> {
    const patientsRepository = this.getRepository(PatientEntity)
    const patientEntity = await patientsRepository.findOne({ email, admin_id })
    return patientEntity || undefined
  }

  async getByCpfAndAdminId({
    admin_id,
    cpf,
  }: GetPatientByCpfAndAdminIdContract.Input): Promise<GetPatientByCpfAndAdminIdContract.Output> {
    const patientsRepository = this.getRepository(PatientEntity)
    const patientEntity = await patientsRepository.findOne({ cpf, admin_id })
    return patientEntity || undefined
  }

  async getById({
    id,
  }: GetPatientByIdContract.Input): Promise<GetPatientByIdContract.Output> {
    const patientsRepository = this.getRepository(PatientEntity)
    const patientEntity = await patientsRepository.findOne({ id })
    return patientEntity || undefined
  }
}
