import { Connection } from "typeorm";

export interface GlobalInterface extends NodeJS.Global {
  pgConnection: Connection;
}
