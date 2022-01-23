export const env = {
  port: process.env.PORT ?? 3333,
  jwtTokenSecret: process.env.JWT_TOKEN_SECRET ?? 'pweriqwpoieçkjfçlsafas',
  jwtRefreshTokenSecret:
    process.env.JWT_REFRESH_TOKEN_SECRET ?? 'rqpworuqwjjksajfçkdsj',
}
