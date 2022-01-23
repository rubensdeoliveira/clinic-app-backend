import {
  GetPatientByEmailAndAdminIdContract,
  GetPatientByCpfAndAdminIdContract,
  GetPatientByIdContract,
} from '@/domain/backoffice/contracts'

import { GetAdminIdByAccountIdContract } from '@/domain/authentication/contracts'
import { EntityNotFoundError, PermissionError } from '@/domain/common/errors'

type Setup = (
  patientsRepository: GetPatientByIdContract &
    GetPatientByEmailAndAdminIdContract &
    GetPatientByCpfAndAdminIdContract &
    GetPatientByIdContract,
  accountsRepository: GetAdminIdByAccountIdContract,
) => GetPatientByIdUseCase
type Input = GetPatientByIdContract.Input & { accountId: string }
type Output = GetPatientByIdContract.Output
export type GetPatientByIdUseCase = (input: Input) => Promise<Output>

export const setupGetPatientByIdUseCase: Setup =
  (patientsRepository, accountsRepository) => async input => {
    const admin_id = await accountsRepository.getAdminIdByAccountId({
      account_id: input.accountId,
    })
    const patient = await patientsRepository.getById({ id: input.id })
    if (!patient) {
      throw new EntityNotFoundError('Patient')
    }
    if (admin_id !== patient.admin_id) {
      throw new PermissionError()
    }
    const patientFromRepository = await patientsRepository.getById({
      id: input.id,
    })
    return patientFromRepository
  }
