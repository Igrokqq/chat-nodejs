import CreateUserDto from "./dto/create-user.dto";
import { UserEntity } from "./user.entity";

export interface UserRepositoryInterface {
  checkUserByEmail(email: string): Promise<boolean>;
  createOne(dto: CreateUserDto): Promise<void>;
  getOneByEmail(email: string): Promise<UserEntity | null>;
}
export interface UserClaimsInterface extends Record<string, string | number> {
  readonly email: string;
}
