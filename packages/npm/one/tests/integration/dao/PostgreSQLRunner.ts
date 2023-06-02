import { one } from "../../../src/main";
import { default as execa } from "execa";
import getPort from "get-port";
import { Pool, PoolConfig, PoolClient } from "pg";

export const POSTGRES_PORT = 5432;

export interface FlywayOptions {
  image: string;
  command: string[];
  env: {
    [key: string]: string;
  };
}

export interface PostgreSQLRunnerOptions {
  // config: Omit<PoolConfig, "host" | "port">;
  image: string;
  name?: string;
  rmContainer?: boolean;
  env: {
    [key: string]: string;
  };
  args?: Array<string>;
  flyway?: Array<FlywayOptions>;
}

export const runFlyway = async (
  port: number,
  options: FlywayOptions
): Promise<void> => {
  console.log("FLYWAY STARTING");
  console.log(options);
  const args: string[] = [
    "run",
    "--rm",
    "--link=db:db",
    "--name=bazel-databases-one-one",
    "--env=FLYWAY_PLACEHOLDERS_CUSTOM_COLUMN_NAME=this_column_name_came_from_a_flyway_placeholder",
    "bazel/databases/one:one",
    "-url=jdbc:postgresql://db/one",
    "-schemas=one",
    "-user=user",
    "-password=pass",
    "-connectRetries=60",
    "-locations=filesystem:/flyway/sql,filesystem:/flyway/custom-sql/dev-sql/,classpath:db/migration",
    "migrate",
  ].filter((v) => v.trim() !== "");
  const { stdout, stderr } = await execa("docker", args);
  console.log(stdout, stderr);

  console.log("FLYWAY DONE RUNNING");
};

export class PostgreSQLRunner {
  private options: PostgreSQLRunnerOptions;
  private postgresId?: string;
  private port?: number;
  constructor(options: PostgreSQLRunnerOptions) {
    this.options = options;
  }

  async start(): Promise<void> {
    console.log(this.options);
    const { image, rmContainer } = this.options;
    const name: string =
      this.options.name !== undefined
        ? this.options.name
        : image.replaceAll("/", "-").replaceAll(":", "-");
    const port = await getPort();
    this.port = port;
    const shouldRemoveContainer =
      rmContainer === undefined ? true : rmContainer;
    const rmRemoveContainerArg = shouldRemoveContainer ? "--rm" : "";

    console.log("lol: ");
    const args: string[] = [
      "run",
      rmRemoveContainerArg, // "--rm",
      `--name=${name}`,
      "--env=POSTGRES_PASSWORD=pass",
      "--env=POSTGRES_USER=user",
      "--detach",
      `--publish=${port}:${POSTGRES_PORT}`,
      image,
    ].filter((v) => v.trim() !== "");
    const { stdout } = await execa("docker", args);

    this.postgresId = stdout.trim();
    console.log(`postgresId: ${this.postgresId}`);
    const pool = new Pool({
      port,
      host: "localhost",
      user: "user",
      password: "password",
    });
    await sleepUntil(500, async () => {
      try {
        console.log("connecting...");
        const client: PoolClient = await pool.connect();
        client.release();
        return true;
      } catch (e) {
        // console.log('ERROR:', e);
        return false;
      }
    });

    console.log("connected");
    await pool.end();

    console.log("this.options.flyway:", this.options.flyway);
    if (this.options.flyway) {
      const flywayOptions = this.options.flyway;
      for (const options of flywayOptions) {
        console.log("fl opt:", options);
        await runFlyway(port, options);
      }
    }

    console.log("STARTED");
  }

  async stop() {
    console.log("Stopping");
    console.log(this.options);
    const { postgresId } = this;

    if (postgresId) {
      const { stdout } = await execa("docker", ["stop", postgresId]);
      console.log(stdout.trim());
    }
  }

  getPort(): number {
    if (this.port === undefined) {
      throw new Error("PostgreSQL port is unavailable");
    }
    return this.port;
  }
}

const delay = async (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

type SleepUntilCallback = () => Promise<boolean>;
const sleepUntil = async (delayMs: number, callback: SleepUntilCallback) => {
  if (!(await callback())) {
    return;
  }
  await delay(delayMs);
};
