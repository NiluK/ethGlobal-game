import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { ImxModule } from 'src/imx/imx.module';
import { AnswerModule } from './answer/answer.module';
import { LeaderBoardModule } from 'src/leaderboard/leaderBoard.module';
import { MetadataModule } from 'src/metadata/metadata.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    QuestionModule,
    ImxModule,
    AnswerModule,
    MetadataModule,
    LeaderBoardModule,
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@citizen-cluster.awcah.mongodb.net/${process.env.MONGO_ATLAS_DB}?retryWrites=true&w=majority`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() { 
    console.log(process.env)
   }
}
