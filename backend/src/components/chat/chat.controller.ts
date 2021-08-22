import BaseHttpController from "@common/server/http/baseHttpController";
import express from "express";
import ChatService from "./chat.service";
import CreateChatDto from "./dto/create-chat.dto";

export default class ChatController extends BaseHttpController {
  private readonly chatService: ChatService = new ChatService();

  async create(req: express.Request, res: express.Response): Promise<void> {
    await this.chatService.createOne(req.body as CreateChatDto);

    this.ok(res, {
      message: "OK",
    });
  }

  async getUserChats(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    this.ok(res, {
      body: await this.chatService.getUserChats(req.body.userId),
    });
  }
}
