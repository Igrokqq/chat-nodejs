import io from "socket.io";
import { GatewayInterface } from "./interfaces";

export default abstract class Gateway implements GatewayInterface {
  protected server: io.Server;
  protected socket: io.Socket;

  constructor(server: io.Server, socket: io.Socket) {
    this.server = server;
    this.socket = socket;
  }

  abstract init(): void;

  protected emitValidationError(errorMessage: string): void {
    this.socket.emit("validation_error", {
      error: errorMessage,
    });
  }
  protected emitInternalServerError(errorMessage: string): void {
    this.socket.emit("fatal_error", {
      error: errorMessage,
    });
  }
}
