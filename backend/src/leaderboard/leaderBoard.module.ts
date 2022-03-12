import { Module } from '@nestjs/common';
import { LeaderBoardService } from './leaderBoard.service';
//import { QuestionModule } from '../question/question.module';
import { LeaderBoardController } from './leaderboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerSchema } from './leaderBoard.model';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Answer', schema: AnswerSchema }]),
  ],
  exports:[LeaderBoardService],
  controllers: [LeaderBoardController],
  providers: [LeaderBoardService],
})
export class LeaderBoardModule {}
