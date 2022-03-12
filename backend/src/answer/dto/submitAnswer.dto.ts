import { IsNumber, IsOptional, IsDefined , IsMongoId} from 'class-validator';
  
export class SubmitAnswerDto {
    @IsDefined()
    @IsMongoId()
    questionId: string;

    @IsNumber()
    @IsDefined()
    answerIndex:Number

    @IsDefined()
    user:String
}