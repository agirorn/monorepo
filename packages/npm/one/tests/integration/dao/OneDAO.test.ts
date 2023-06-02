import { one } from "../../../src/main";
import { OneDAO } from "../../../src/dao/OneDAO";
import { default as execa } from "execa";
import getPort from "get-port";
import { Pool, PoolConfig, PoolClient } from "pg";
import { PostgreSQLRunner } from "./PostgreSQLRunner";

let postgres: PostgreSQLRunner;
let pool: Pool;
beforeAll(async () => {
  postgres = new PostgreSQLRunner({
    rmContainer: true,
    image: "bazel/postgres:postgres_image",
    name: "db",
    env: {
      POSTGRES_USER: "user",
      POSTGRES_PASSWORD: "pass",
    },
    flyway: [
      {
        image: "bazel/databases/one:one",
        command: [
          "-url=jdbc:postgresql://db/one",
          "-schemas=one",
          "-user=user",
          "-password=pass",
          "-connectRetries=60",
          "-locations=filesystem:/flyway/sql,filesystem:/flyway/custom-sql/${CUSTOM_SQL:-dev}-sql/,classpath:db/migration",
          "migrate",
        ],
        env: {
          FLYWAY_PLACEHOLDERS_CUSTOM_COLUMN_NAME:
            "this_column_name_came_from_a_flyway_placeholder",
        },
      },
    ],
  });

  await postgres.start();

  pool = new Pool({
    port: postgres.getPort(),
    host: "localhost",
    user: "user",
    password: "pass",
    database: "one",
  });

  const client: PoolClient = await pool.connect();
  client.release();
}, 20000);

afterAll(async () => {
  await pool.end();
  await postgres.stop();
});

test("select from one.one", async () => {
  const { rows } = await pool.query("SELECT * FROM one.one");
  expect(rows).toEqual([
    { id: 1, name: "Anonymous1", real_name: "Ilonka Budi" },
    { id: 2, name: "Anonymous2", real_name: "Amaranta Natalie" },
    { id: 3, name: "Anonymous3", real_name: "Janvier Harun" },
    { id: 4, name: "Anonymous4", real_name: "Anastas Nikusha" },
    { id: 5, name: "Anonymous5", real_name: "Chukwuma Jyoti" },
    { id: 6, name: "Anonymous6", real_name: "Blažej Stella" },
  ]);
});

test("select from one", async () => {
  const dao = new OneDAO(pool);
  expect(await dao.getAll()).toEqual([
    { id: 1, name: "Anonymous1", real_name: "Ilonka Budi" },
    { id: 2, name: "Anonymous2", real_name: "Amaranta Natalie" },
    { id: 3, name: "Anonymous3", real_name: "Janvier Harun" },
    { id: 4, name: "Anonymous4", real_name: "Anastas Nikusha" },
    { id: 5, name: "Anonymous5", real_name: "Chukwuma Jyoti" },
    { id: 6, name: "Anonymous6", real_name: "Blažej Stella" },
  ]);
});
