import { Router } from 'express'
import { makeSessionRoute, SessionRouteProps } from './sessions'
import { makeUserRoute, UserRouteProps } from './users'

export type AuthenticationRouteProps = UserRouteProps & SessionRouteProps

export const makeAuthenticationRoute = (props: AuthenticationRouteProps): Router => {
  const router = Router()
  router.use('/authentication', makeUserRoute(props))
  router.use('/authentication', makeSessionRoute(props))
  return router
}
