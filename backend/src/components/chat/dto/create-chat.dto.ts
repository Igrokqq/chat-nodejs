import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export default class CreateChatDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 64)
  readonly label: string;

  @IsOptional()
  @IsString()
  @Length(20, 240)
  readonly description?: string;

  @IsNotEmpty()
  @IsNumber()
  readonly ownerId: number;
}
