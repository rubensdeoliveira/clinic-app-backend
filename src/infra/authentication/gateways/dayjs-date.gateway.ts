import dayjs from 'dayjs'

import { AddDaysToDateContract } from '@/domain/authentication/contracts'

export class DayjsDateGateway implements AddDaysToDateContract {
  addDays({ days }: AddDaysToDateContract.Input): AddDaysToDateContract.Output {
    return dayjs().add(days, 'days').toDate()
  }
}
