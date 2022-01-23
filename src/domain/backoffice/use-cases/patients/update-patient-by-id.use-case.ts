import {
  GetPatientByEmailAndAdminIdContract,
  GetPatientByCpfAndAdminIdContract,
  UpdatePatientByIdContract,
} from '@/domain/backoffice/contracts'
import {
  PatientEmailInUseError,
  PatientCpfInUseError,
} from '@/domain/backoffice/errors'
import { GetAdminIdByAccountIdContract } from '@/domain/authentication/contracts'

type Setup = (
  patientsRepository: UpdatePatientByIdContract &
    GetPatientByEmailAndAdminIdContract &
    GetPatientByCpfAndAdminIdContract,
  accountsRepository: GetAdminIdByAccountIdContract,
) => UpdatePatientByIdUseCase
type Input = UpdatePatientByIdContract.Input & { accountId: string }
type Output = UpdatePatientByIdContract.Output
export type UpdatePatientByIdUseCase = (input: Input) => Promise<Output>

export const setupUpdatePatientByIdUseCase: Setup =
  (patientsRepository, accountsRepository) => async input => {
    const admin_id = await accountsRepository.getAdminIdByAccountId({
      account_id: input.accountId,
    })
    const patientByEmail = await patientsRepository.getByEmailAndAdminId({
      email: input.email,
      admin_id,
    })
    if (patientByEmail && input.email !== patientByEmail.email) {
      throw new PatientEmailInUseError()
    }
    const patientByCpf = await patientsRepository.getByCpfAndAdminId({
      cpf: input.cpf,
      admin_id,
    })
    if (patientByCpf && input.cpf !== patientByCpf.cpf) {
      throw new PatientCpfInUseError()
    }
    const patientUpdated = await patientsRepository.updateById({
      ...input,
      admin_id,
    })
    return patientUpdated
  }
