import CreateMemberDto from "./dto/create-member.dto";
import { MemberRepositoryInterface } from "./interfaces";
import { MemberExistsError } from "./member.errors";
import MemberRepository from "./member.repository";
import { CreateOneMemberResponse } from "./member.responses";

export default class MemberService {
  private readonly memberRepository: MemberRepositoryInterface =
    new MemberRepository();

  async createOne(dto: CreateMemberDto): Promise<CreateOneMemberResponse> {
    const memberExists: boolean = await this.memberRepository.checkMemberInChat(
      dto.chatId,
      dto.userId
    );

    if (memberExists) {
      return new MemberExistsError(dto.chatId);
    }

    await this.memberRepository.createOne(dto);
  }
}
