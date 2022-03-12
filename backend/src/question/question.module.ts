import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from './question.model';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Question', schema: QuestionSchema }]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports:[QuestionService]
})
export class QuestionModule {}
