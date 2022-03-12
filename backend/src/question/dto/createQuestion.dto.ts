import { IsNumber, IsNotEmpty, IsDefined } from 'class-validator';
  
interface Option {
    text: string;
}
export class CreateQuestiontDto {
    @IsDefined()
    questionTitle: String;

    @IsDefined()
    questionText: String;

    @IsNumber({ allowNaN: false })
    @IsDefined()
    questionLevel: Number;

    @IsDefined()
    @IsNumber({ allowNaN: false })
    correctIndex: Number;

    @IsDefined()
    options:Array<Option>;

    @IsDefined()
    accessToken:String;

    @IsDefined()
    chestId:String;
}