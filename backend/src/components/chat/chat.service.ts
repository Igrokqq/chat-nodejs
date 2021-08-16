import { ChatEntity } from "./chat.entity";
import ChatRepository from "./chat.repository";
import CreateChatDto from "./dto/create-chat.dto";
import { ChatRepositoryInterface } from "./interfaces";

export default class ChatService {
  private readonly chatRepository: ChatRepositoryInterface =
    new ChatRepository();

  createOne(dto: CreateChatDto): Promise<void> {
    return this.chatRepository.createOne(dto);
  }

  getAll(): Promise<ChatEntity[]> {
    return this.chatRepository.getAll();
  }
}
