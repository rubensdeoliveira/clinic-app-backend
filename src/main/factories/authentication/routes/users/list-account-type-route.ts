import { UserTypeModel } from '@/domain/authentication'
import { routeAdapter, middlewareAdapter } from '@/main/common/adapters'
import { AuthenticatedRequestMiddlewareProps, makeAuthenticatedRequestMiddleware } from '@/main/factories/authentication/middlewares'
import { makeListUserTypesController } from '@/main/factories/authentication/controllers'
import { Router } from 'express'

export type ListUserTypesRouteProps = AuthenticatedRequestMiddlewareProps

export const makeListUserTypesRoute = (props: ListUserTypesRouteProps): Router => {
  return Router()
    .get('/types',
      middlewareAdapter(makeAuthenticatedRequestMiddleware({
        repositoryType: props.repositoryType,
        userTypesWithAccess: [UserTypeModel.administrator]
      })),
      routeAdapter(makeListUserTypesController()))
}
