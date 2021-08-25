import RequestValidation from "@common/server/http/requestValidation";
import express from "express";
import CreateChatDto from "./dto/create-chat.dto";
import ChatController from "./chat.controller";
import GetChatsDto from "./dto/get-user-chats.dto";
import JwtAccessTokenGuard from "@components/user/auth/guards/jwtAccessToken.guard";

export default class ChatRouter {
  private readonly router: express.Router = express.Router();
  private readonly chatController: ChatController = new ChatController();

  constructor() {
    this.router.post(
      "/",
      [
        JwtAccessTokenGuard.getHandler(),
        RequestValidation.getHandler({
          dto: CreateChatDto,
          sourcePropertyName: "body",
        }),
      ],
      this.chatController.create.bind(this.chatController)
    );
    this.router.get(
      "/",
      [
        JwtAccessTokenGuard.getHandler(),
        RequestValidation.getHandler({
          dto: GetChatsDto,
          sourcePropertyName: "query",
        }),
      ],
      this.chatController.getUserChats.bind(this.chatController)
    );
  }

  getRouter(): express.Router {
    return this.router;
  }
}
