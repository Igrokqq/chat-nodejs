import RequestValidation from "@common/server/http/requestValidation";
import express from "express";
import CreateChatDto from "./dto/create-chat.dto";
import ChatController from "./chat.controller";

export default class ChatRouter {
  private readonly router: express.Router = express.Router();
  private readonly chatController: ChatController = new ChatController();

  constructor() {
    this.router.post(
      "/",
      RequestValidation.getHandler({
        dto: CreateChatDto,
        sourcePropertyName: "body",
      }),
      this.chatController.create.bind(this.chatController)
    );
  }

  getRouter(): express.Router {
    return this.router;
  }
}
