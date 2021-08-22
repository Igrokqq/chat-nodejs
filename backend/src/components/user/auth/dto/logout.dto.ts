import { Expose } from "class-transformer";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export default class LogoutDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly refreshToken: string = "";

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string = "";
}
