import { UserEntity } from "./user.entity";
import { UserExistsError, UserNotExistsError } from "./user.errors";

export type SignUpResponse = void | UserExistsError;
export type GetUserByEmailResponse = UserEntity | UserNotExistsError;
