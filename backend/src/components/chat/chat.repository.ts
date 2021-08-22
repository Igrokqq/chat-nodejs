import GlobalManager from "@common/global/manager";
import { Connection, Repository } from "typeorm";
import { ChatEntity } from "./chat.entity";
import CreateChatDto from "./dto/create-chat.dto";
import { ChatRepositoryInterface } from "./interfaces";

export default class ChatRepository implements ChatRepositoryInterface {
  private chatEntityRepository: Repository<ChatEntity>;

  constructor() {
    const pgConnection = GlobalManager.getProperty(
      "pgConnection"
    ) as Connection;

    this.chatEntityRepository = pgConnection.getRepository(ChatEntity);
  }
  async createOne(dto: CreateChatDto): Promise<void> {
    await this.chatEntityRepository.save(dto as ChatEntity);
  }

  getAll(): Promise<ChatEntity[]> {
    return this.chatEntityRepository.find();
  }

  getUserChats(userId: number): Promise<ChatEntity[]> {
    return this.chatEntityRepository.find({
      where: {
        ownerId: userId,
      },
    });
  }
}
