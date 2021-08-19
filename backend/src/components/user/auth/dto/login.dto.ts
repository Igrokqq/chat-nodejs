import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export default class LoginDto {
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @Expose()
  @IsNotEmpty()
  @IsString()
  @Length(8, 64)
  readonly password: string;
}
