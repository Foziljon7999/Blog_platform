import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsInt()
  parentId?: number;

  @IsNotEmpty()
  @IsNumber()
  postId: number;
}
