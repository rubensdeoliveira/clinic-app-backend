import {
  GetPatientByEmailAndAdminIdContract,
  GetPatientByCpfAndAdminIdContract,
  ListPatientsContract,
} from '@/domain/backoffice/contracts'
import { GetAdminIdByAccountIdContract } from '@/domain/authentication/contracts'

type Setup = (
  patientsRepository: ListPatientsContract &
    GetPatientByEmailAndAdminIdContract &
    GetPatientByCpfAndAdminIdContract,
  accountsRepository: GetAdminIdByAccountIdContract,
) => ListPatientsUseCase
type Input = ListPatientsContract.Input & { accountId: string }
type Output = ListPatientsContract.Output
export type ListPatientsUseCase = (input: Input) => Promise<Output>

export const setupListPatientsUseCase: Setup =
  (patientsRepository, accountsRepository) => async input => {
    const admin_id = await accountsRepository.getAdminIdByAccountId({
      account_id: input.accountId,
    })
    const patients = await patientsRepository.list({
      page: input.page,
      admin_id,
    })
    return patients
  }
