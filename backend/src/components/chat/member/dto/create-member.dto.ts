import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export default class CreateMemberDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  readonly chatId: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;
}
