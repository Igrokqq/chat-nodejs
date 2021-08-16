import CreateMessageDto from "./dto/create-message.dto";
import { MessageEntity } from "./message.entity";

export interface MessageRepositoryInterface {
  createOne(dto: CreateMessageDto): Promise<MessageEntity>;
}
