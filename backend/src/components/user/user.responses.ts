import { UserExistsError } from "./user.errors";

export type SignUpResponse = void | UserExistsError;
