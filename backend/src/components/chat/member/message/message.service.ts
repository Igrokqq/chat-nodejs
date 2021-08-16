import CreateMessageDto from "./dto/create-message.dto";
import MessageRepository from "./message.repository";

export default class MessageService {
  private readonly messageRepository: MessageRepository =
    new MessageRepository();

  async createOne(dto: CreateMessageDto): Promise<void> {
    await this.messageRepository.createOne(dto);
  }
}
