import {
  GetPatientByEmailAndAdminIdContract,
  GetPatientByCpfAndAdminIdContract,
  CreatePatientContract,
} from '@/domain/backoffice/contracts'
import {
  PatientEmailInUseError,
  PatientCpfInUseError,
} from '@/domain/backoffice/errors'
import { GetAdminIdByAccountIdContract } from '@/domain/authentication/contracts'

type Setup = (
  patientsRepository: CreatePatientContract &
    GetPatientByEmailAndAdminIdContract &
    GetPatientByCpfAndAdminIdContract,
  accountsRepository: GetAdminIdByAccountIdContract,
) => CreatePatientUseCase
type Input = CreatePatientContract.Input & { accountId: string }
type Output = CreatePatientContract.Output
export type CreatePatientUseCase = (input: Input) => Promise<Output>

export const setupCreatePatientUseCase: Setup =
  (patientsRepository, accountsRepository) => async input => {
    const admin_id = await accountsRepository.getAdminIdByAccountId({
      account_id: input.accountId,
    })
    const patientByEmail = await patientsRepository.getByEmailAndAdminId({
      email: input.email,
      admin_id,
    })
    if (patientByEmail) {
      throw new PatientEmailInUseError()
    }
    const patientByCpf = await patientsRepository.getByCpfAndAdminId({
      cpf: input.cpf,
      admin_id,
    })
    if (patientByCpf) {
      throw new PatientCpfInUseError()
    }
    const patientCreated = await patientsRepository.create({
      ...input,
      admin_id,
    })
    return patientCreated
  }
