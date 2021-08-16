import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export default class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  readonly body: string = "";

  @IsNotEmpty()
  @IsNumber()
  readonly fromUserId!: number;
}
