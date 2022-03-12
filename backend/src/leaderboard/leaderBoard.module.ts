import { Module } from '@nestjs/common';
import { LeaderBoardService } from './leaderBoard.service';
//import { QuestionModule } from '../question/question.module';
import { LeaderBoardController } from './leaderboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerSchema } from '../answer/answer.model';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Answer', schema: AnswerSchema }]),
  ],
  controllers: [LeaderBoardController],
  providers: [LeaderBoardService],
  exports:[LeaderBoardService]
})
export class LeaderBoardModule {}
