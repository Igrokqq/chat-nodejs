import GlobalManager from "@common/global/manager";
import { Connection, Repository } from "typeorm";
import CreateMemberDto from "./dto/create-member.dto";
import { MemberRepositoryInterface } from "./interfaces";
import { MemberEntity } from "./member.entity";

export default class MemberRepository implements MemberRepositoryInterface {
  private memberEntityRepository!: Repository<MemberEntity>;

  constructor() {
    const pgConnection = GlobalManager.getProperty(
      "pgConnection"
    ) as Connection;
    this.memberEntityRepository = pgConnection.getRepository(MemberEntity);
  }

  async checkMemberInChat(chatId: number, userId: number): Promise<boolean> {
    const member: MemberEntity | null =
      await this.memberEntityRepository.findOne({
        where: {
          chatId: chatId,
          userId: userId,
        },
      });

    return !!member;
  }

  createOne(dto: CreateMemberDto): Promise<MemberEntity> {
    return this.memberEntityRepository.save(dto);
  }
}
