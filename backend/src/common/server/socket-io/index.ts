import config from "@common/config";
import io, { Socket } from "socket.io";
import { ServerInterface } from "../interfaces";
import gateways from "./gateways";

export default class SocketIoServer implements ServerInterface {
  private wsServer: io.Server;

  async run(): Promise<void> {
    this.wsServer = (io as any)(config.server.socketIo.port);

    this.wsServer.on("connection", (socket: Socket) => {
      console.log("Socket connected");
      socket.on("connect_error", (error: Error) => {
        console.error(`connect_error due to ${error.message}`);
      });
      gateways.forEach((gateway) => new gateway(this.wsServer, socket).init());
      socket.on("disconnect", () => {
        console.warn("Socket disconnected");
      });
    });
  }
}
