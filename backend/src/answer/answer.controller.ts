import {
    Controller,
    Post,
    Body,
    HttpException,
    Query,
    Get,
    HttpStatus,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  import { AnswerService } from 'src/answer/answer.service';
  import { QuestionService } from '../question/question.service';
  import { SubmitAnswerDto } from './dto';
  import { ImxService } from '../imx/imx.service';

  
  @Controller('answers')
  export class AnswerController {
    constructor(
      private readonly answerService:AnswerService,
      private readonly imxService:ImxService,
      private readonly questionService: QuestionService) {}
  
    @Post()
    async submitAnswer(@Body() submitAnswer: SubmitAnswerDto): Promise<any> {
      let isCorrect = false;
      let transaction;
      let message = "You loose 😞";
      const question = await this.questionService.findOne(submitAnswer.questionId);
      if(!question) throw new HttpException('question not found', HttpStatus.NOT_FOUND);
      const isAlreadyAnswered = await this.answerService.findAnswer({ user: submitAnswer.user, questionId:question._id });
      if(!question) throw new HttpException('question not found', HttpStatus.NOT_FOUND);
      if(question.correctIndex === submitAnswer.answerIndex)  {
        isCorrect = true;
        message ="You win 😀";
        transaction = await this.imxService.mintFor(submitAnswer.user.toString());
      }
      if(isAlreadyAnswered && question.correctIndex === submitAnswer.answerIndex) {
        isCorrect = true;
        message ="You win 😀";
      }

      await this.answerService.create( { ...submitAnswer, isCorrect });
      return { isCorrect, message, transaction }
    }
 
  }
  