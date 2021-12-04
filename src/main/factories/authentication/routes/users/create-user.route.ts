import { routeAdapter } from '@/main/common/adapters'
import { CreateUserControllerProps, makeCreateUserController } from '@/main/factories/authentication/controllers'
import { Router } from 'express'

export type CreateUserRouteProps = CreateUserControllerProps

export const makeCreateUserRoute = (props: CreateUserRouteProps): Router => {
  return Router().post('/create', routeAdapter(makeCreateUserController(props)))
}
