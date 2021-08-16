// DONT REMOVE IT. IF YOU REMOVE IT YOU CANNOT USE PATH SHORTCUTS LIKE @src
import "module-alias/register";
import "reflect-metadata";
import HttpServer from "@common/server/http";
import SocketIoServer from "@common/server/socket-io";
import GlobalManager from "@common/global/manager";
import PgDatabase from "@common/database/pg/db";

async function main(): Promise<void> {
  GlobalManager.extendWithProperty("pgConnection", await PgDatabase.connect());

  const httpServer: HttpServer = new HttpServer();
  await httpServer.run();

  const socketIoServer: SocketIoServer = new SocketIoServer();
  await socketIoServer.run();
}
main();
