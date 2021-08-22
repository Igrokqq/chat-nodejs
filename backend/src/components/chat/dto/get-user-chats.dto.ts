import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class GetChatsDto {
  @Expose()
  @IsOptional()
  @IsString()
  readonly limit?: number;

  @Expose()
  @IsOptional()
  @IsString()
  readonly skip?: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly userId: number;
}
