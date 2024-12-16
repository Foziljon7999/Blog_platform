import { IsOptional, IsString } from "class-validator";

export class FilterPostsDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    categoryId?: number;

    @IsOptional()
    sortBy?: 'likes' | 'date'
}