import { IsNumber, IsOptional, IsDefined } from 'class-validator';
  
export class QueryLearderBoardDto {

    @IsOptional()
    sort:string

    @IsOptional()
    user:string
}