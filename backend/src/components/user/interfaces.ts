import CreateUserDto from "./dto/create-user.dto";

export interface UserRepositoryInterface {
  checkUserByEmail(email: string): Promise<boolean>;
  createOne(dto: CreateUserDto): Promise<void>;
}
