import Gateway from "@common/server/socket-io/gateway";
import io from "socket.io";
import { ChatEntity } from "./chat.entity";
import ChatService from "./chat.service";
import { MemberExistsError } from "./member/member.errors";
import { CreateOneMemberResponse } from "./member/member.responses";
import MemberService from "./member/member.service";
import CreateMessageDto from "./member/message/dto/create-message.dto";
import MessageService from "./member/message/message.service";

type MessageIncomingData = CreateMessageDto & {
  readonly chatId: number;
};
type ChatJoinIncomingData = {
  readonly chatId: number;
  readonly userId: number;
};
const CHAT_EVENTS: Record<string, string> = {
  NEW_MESSAGE: "chat:new-message",
  MESSAGE: "chat:message",
  JOIN_CHAT: "chat:join",
  CHATS_FETCH: "chat:fetch",
  CHATS_FETCHED: "chat:fetch:fetched",
};
export class ChatGateway extends Gateway {
  private readonly messageService: MessageService = new MessageService();
  private readonly chatService: ChatService = new ChatService();
  private readonly memberService: MemberService = new MemberService();

  constructor(server: io.Server, socket: io.Socket) {
    super(server, socket);
  }
  private generateChatIdFrom(chatId: number): string {
    return `chat-${chatId}`;
  }

  private async onMessage(data: MessageIncomingData): Promise<void> {
    try {
      this.server
        .to(this.generateChatIdFrom(data.chatId))
        .emit(CHAT_EVENTS.NEW_MESSAGE, {
          fromUserId: data.fromUserId,
          body: data.body,
        });
      await this.messageService.createOne(data);
    } catch (error) {
      this.emitInternalServerError(error.toString());
    }
  }

  private async onJoin(data: ChatJoinIncomingData): Promise<void> {
    const createOneMemberResponse: CreateOneMemberResponse =
      await this.memberService.createOne(data);

    if (createOneMemberResponse instanceof Error) {
      switch (createOneMemberResponse.constructor) {
        case MemberExistsError:
          return this.emitValidationError("Member already joined this chat");
        default:
          return this.emitInternalServerError(createOneMemberResponse.message);
      }
    }
    this.socket.join(this.generateChatIdFrom(data.chatId));
  }

  private async onChatsFetch(): Promise<void> {
    try {
      const chats: ChatEntity[] = await this.chatService.getAll();

      this.socket.emit(CHAT_EVENTS.CHATS_FETCHED, {
        chats,
      });
    } catch (error) {
      this.emitInternalServerError(error.toString());
    }
  }

  init(): void {
    this.socket.on(CHAT_EVENTS.MESSAGE, this.onMessage.bind(this));
    this.socket.on(CHAT_EVENTS.JOIN_CHAT, this.onJoin.bind(this));
    this.socket.on(CHAT_EVENTS.CHATS_FETCH, this.onChatsFetch.bind(this));
  }
}
