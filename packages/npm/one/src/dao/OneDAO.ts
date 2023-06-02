import { Pool } from "pg";

interface OneRow {
  id: number;
  name: string;
  real_name: string;
}

export class OneDAO {
  readonly pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getAll(): Promise<OneRow[]> {
    return (
      await this.pool.query(`
        SELECT *
          FROM one.one
      `)
    ).rows as OneRow[];
  }
}
