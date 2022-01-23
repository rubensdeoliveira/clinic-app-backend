module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/**/repositories/typeorm/**/entities/**.entity.ts`
  ],
  migrations: [`${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/common/repositories/typeorm/migrations/*-migration.ts`],
  cli: {
    migrationsDir: `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/common/repositories/typeorm/migrations`
  }
}
