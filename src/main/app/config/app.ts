import { setupMiddlewares } from '@/main/app/config/middlewares'
import { setupRoutes } from '@/main/app/config/routes'
import { setupCelebrate } from '@/main/app/config/celebrate'

import express from 'express'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
setupCelebrate(app)
export { app }
