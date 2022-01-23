import './app/config/module-alias'
import { env } from '@/main/app/config/env'
import { TypeormConnection } from '@/infra/common/repositories/typeorm'

import 'reflect-metadata'

TypeormConnection.getInstance()
  .connect()
  .then(async () => {
    const { app } = await import('@/main/app/config/app')
    app.listen(env.port, () =>
      console.log(`Server running at http://localhost:${env.port}`),
    )
  })
  .catch(console.error)
