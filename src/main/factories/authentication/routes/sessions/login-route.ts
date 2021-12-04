import { routeAdapter } from '@/main/common/adapters'
import { makeLoginController, LoginControllerProps } from '@/main/factories/authentication/controllers'
import { Router } from 'express'

export type LoginRouteProps = LoginControllerProps

export const makeLoginRoute = (props: LoginRouteProps): Router => {
  return Router().post('/create', routeAdapter(makeLoginController(props)))
}
