import 'module-alias/register'
import { ConfigSetup } from '@/main/config/environment/config'
import app from '@/main/config/express/app'

const config = ConfigSetup()
app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`)
})
