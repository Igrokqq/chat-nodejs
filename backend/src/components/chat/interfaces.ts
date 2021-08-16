import { ChatEntity } from "./chat.entity";
import CreateChatDto from "./dto/create-chat.dto";

export interface ChatRepositoryInterface {
  createOne(dto: CreateChatDto): Promise<void>;
  getAll(): Promise<ChatEntity[]>;
}
