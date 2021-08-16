import CreateUserDto from "./dto/create-user.dto";
import { UserExistsError } from "./user.errors";
import UserRepository from "./user.repository";
import { SignUpResponse } from "./user.responses";

export default class UserService {
  private readonly userRepository: UserRepository = new UserRepository();

  async signUp(dto: CreateUserDto): Promise<SignUpResponse> {
    const userExists: boolean = await this.userRepository.checkUserByEmail(
      dto.email
    );

    if (userExists) {
      return new UserExistsError();
    }

    await this.userRepository.createOne(dto);
  }
}
