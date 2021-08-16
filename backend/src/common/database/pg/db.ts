import { Connection, createConnection } from "typeorm";
import * as Hooks from "./hooks";

export default class PgDatabase {
  static async connect(): Promise<Connection> {
    try {
      const connection: Connection = await createConnection();

      if (connection.isConnected) {
        Hooks.onConnected();
      }

      return connection;
    } catch (error) {
      console.error("Postgres connection failed", error);
    }
  }
}
