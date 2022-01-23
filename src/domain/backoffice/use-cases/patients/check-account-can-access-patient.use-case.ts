import { GetPatientByIdContract } from '@/domain/backoffice/contracts'
import { GetAdminIdByAccountIdContract } from '@/domain/authentication/contracts'
import { EntityNotFoundError, PermissionError } from '@/domain/common/errors'

type Setup = (
  patientsRepository: GetPatientByIdContract,
  accountsRepository: GetAdminIdByAccountIdContract,
) => CheckAccountCanAccessPatientUseCase
type Input = { accountId: string; id: string }
export type CheckAccountCanAccessPatientUseCase = (
  input: Input,
) => Promise<boolean | Error>

export const setupCheckAccountCanAccessPatientUseCase: Setup =
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
    return true
  }
