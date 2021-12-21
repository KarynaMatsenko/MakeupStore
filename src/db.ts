import { createConnection } from "typeorm";
import { models } from "./models";

export default async () => {
  const connection = await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT!),
      username: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
      entities: models,
      name: 'default',
      logging: ['query'],
  });
  return connection;
};