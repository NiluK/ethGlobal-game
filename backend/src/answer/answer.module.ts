import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { QuestionModule } from '../question/question.module';
import { AnswerController } from './answer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerSchema } from './answer.model';
import { ImxModule } from 'src/imx/imx.module';


@Module({
  imports: [
    ImxModule,
    QuestionModule,
    MongooseModule.forFeature([{ name: 'Answer', schema: AnswerSchema }]),
  ],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports:[AnswerService],
})
export class AnswerModule {}
