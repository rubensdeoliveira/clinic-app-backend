import { CreateUserRouteProps, makeCreateUserRoute } from './create-user.route'
import { makeListUserTypesRoute, ListUserTypesRouteProps } from './list-account-type-route'
import { Router } from 'express'

export type UserRouteProps = CreateUserRouteProps & ListUserTypesRouteProps

export const makeUserRoute = (props: UserRouteProps): Router => {
  const router = Router()
  router.use('/users', makeCreateUserRoute(props))
  router.use('/users', makeListUserTypesRoute(props))
  return router
}
