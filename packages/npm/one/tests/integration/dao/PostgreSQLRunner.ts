import { default as execa } from "execa";
import getPort from "get-port";
import { Pool, PoolClient } from "pg";

export const POSTGRES_PORT = 5432;

export interface FlywayOptions {
  image: string;
  name?: string;
  database: string;
  schema?: string;
  user: string;
  password: string;
  connectRetries?: number;
  locations: string[];
  env: {
    [key: string]: string;
  };
}

export interface PostgreSQLRunnerOptions {
  image: string;
  name?: string;
  rmContainer?: boolean;
  env: {
    [key: string]: string;
  };
  args?: Array<string>;
  flyway?: Array<FlywayOptions>;
}

export const runFlyway = async ({
  postgreSqlName,
  options,
}: {
  postgreSqlName: string;
  options: FlywayOptions;
}): Promise<void> => {
  const name: string = containerName(options);
  const envs: string[] = Object.keys(options.env).map((key: string) => {
    const value = options.env[key];
    return `--env=${key}=${value}`;
  });

  const schema: string =
    options.schema !== undefined ? `-schemas=${options.schema}` : "";

  const connectRetries: string =
    options.connectRetries !== undefined
      ? `-connectRetries=${options.connectRetries}`
      : "-connectRetries=60";
  const locations = `-locations=${options.locations.join(",")}`;
  const args: string[] = [
    "run",
    "--rm",
    `--link=${postgreSqlName}:${postgreSqlName}`,
    `--name=${name}`,
    ...envs,
    options.image,
    `-url=jdbc:postgresql://${postgreSqlName}/${options.database}`,
    schema,
    `-user=${options.user}`,
    `-password=${options.password}`,
    connectRetries,
    locations,
    "migrate",
  ].filter((v) => v.trim() !== "");
  await execa("docker", args);
};

export class PostgreSQLRunner {
  private options: PostgreSQLRunnerOptions;
  private postgresId?: string;
  private port?: number;
  constructor(options: PostgreSQLRunnerOptions) {
    this.options = options;
  }

  async start(): Promise<void> {
    const { image, rmContainer } = this.options;
    const name: string = containerName(this.options);
    const port = await getPort();
    this.port = port;
    const shouldRemoveContainer =
      rmContainer === undefined ? true : rmContainer;
    const rmRemoveContainerArg = shouldRemoveContainer ? "--rm" : "";

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
    const pool = new Pool({
      port,
      host: "localhost",
      user: "user",
      password: "password",
    });
    await sleepUntil(500, async () => {
      try {
        const client: PoolClient = await pool.connect();
        client.release();
        return true;
      } catch (e) {
        return false;
      }
    });

    await pool.end();

    if (this.options.flyway) {
      const flywayOptions = this.options.flyway;
      for (const options of flywayOptions) {
        await runFlyway({
          postgreSqlName: name,
          options,
        });
      }
    }
  }

  async stop(): Promise<void> {
    const { postgresId } = this;

    if (postgresId) {
      await execa("docker", ["stop", postgresId]);
    }
  }

  getPort(): number {
    if (this.port === undefined) {
      throw new Error("PostgreSQL port is unavailable");
    }
    return this.port;
  }
}

const containerName = ({
  image,
  name,
}: {
  image: string;
  name?: string;
}): string => {
  return name !== undefined
    ? name
    : image.replaceAll("/", "-").replaceAll(":", "-");
};

const delay = async (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

type SleepUntilCallback = () => Promise<boolean>;
const sleepUntil = async (
  delayMs: number,
  callback: SleepUntilCallback
): Promise<void> => {
  if (!(await callback())) {
    return;
  }
  await delay(delayMs);
};
