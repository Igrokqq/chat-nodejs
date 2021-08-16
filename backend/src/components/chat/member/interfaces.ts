import CreateMemberDto from "./dto/create-member.dto";
import { MemberEntity } from "./member.entity";

export interface MemberRepositoryInterface {
  checkMemberInChat(chatId: number, userId: number): Promise<boolean>;
  createOne(dto: CreateMemberDto): Promise<MemberEntity>;
}
