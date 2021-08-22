import CreateUserDto from "./dto/create-user.dto";
import { UserEntity } from "./user.entity";
import { UserExistsError, UserNotExistsError } from "./user.errors";
import UserRepository from "./user.repository";
import { GetUserByEmailResponse, SignUpResponse } from "./user.responses";

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

  async getUserByEmail(email: string): Promise<GetUserByEmailResponse> {
    const user: UserEntity | null = await this.userRepository.getOneByEmail(
      email
    );

    if (!user) {
      return new UserNotExistsError();
    }

    return user;
  }
}
