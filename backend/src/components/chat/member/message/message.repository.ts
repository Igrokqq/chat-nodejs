import GlobalManager from "@common/global/manager";
import { Connection, Repository } from "typeorm";
import CreateMessageDto from "./dto/create-message.dto";
import { MessageRepositoryInterface } from "./interfaces";
import { MessageEntity } from "./message.entity";

export default class MessageRepository implements MessageRepositoryInterface {
  private messageEntityRepository: Repository<MessageEntity>;

  constructor() {
    const pgConnection = GlobalManager.getProperty(
      "pgConnection"
    ) as Connection;
    this.messageEntityRepository = pgConnection.getRepository(MessageEntity);
  }

  createOne(dto: CreateMessageDto): Promise<MessageEntity> {
    return this.messageEntityRepository.save(dto as MessageEntity);
  }
}
