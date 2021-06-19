import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { configEnv } from './env.config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: configEnv.POSTGRES_HOST,
  port: parseInt(configEnv.POSTGRES_PORT, 10),
  username: configEnv.POSTGRES_USER,
  password: configEnv.POSTGRES_PASSWORD,
  database: configEnv.POSTGRES_DATABASE,
  synchronize: true, // Change to false in production
  logging: true,
  // https://typeorm.io/#/undefined/loading-all-entities-from-the-directory
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};
