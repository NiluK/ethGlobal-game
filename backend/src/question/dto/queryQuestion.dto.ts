import { IsNumber, IsOptional, IsDefined } from 'class-validator';
  
export class QueryQuestiontDto {
    @IsOptional()
    questionLevel: Number;

    @IsOptional()
    questionCategory:String
}