import {
  GetPatientByEmailAndAdminIdContract,
  GetPatientByCpfAndAdminIdContract,
  DeletePatientByIdContract,
  GetPatientByIdContract,
} from '@/domain/backoffice/contracts'
import { GetAdminIdByAccountIdContract } from '@/domain/authentication/contracts'
import { EntityNotFoundError, PermissionError } from '@/domain/common/errors'
import { CheckAccountCanAccessPatientUseCase } from '@/domain/backoffice/use-cases'

type Setup = (
  patientsRepository: DeletePatientByIdContract &
    GetPatientByEmailAndAdminIdContract &
    GetPatientByCpfAndAdminIdContract &
    GetPatientByIdContract,
  accountsRepository: GetAdminIdByAccountIdContract,
  checkAccountCanAccessPatientUseCase: CheckAccountCanAccessPatientUseCase,
) => DeletePatientByIdUseCase
type Input = DeletePatientByIdContract.Input & { accountId: string }
export type DeletePatientByIdUseCase = (input: Input) => Promise<void>

export const setupDeletePatientByIdUseCase: Setup =
  (
    patientsRepository,
    accountsRepository,
    checkAccountCanAccessPatientUseCase,
  ) =>
  async input => {
    const patientDeleted = await patientsRepository.deleteById({
      id: input.id,
    })
    return patientDeleted
  }
