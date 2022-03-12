import { Module } from '@nestjs/common';
import { ImxService } from './imx.service';
import { ImxController } from './imx.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImxSchema } from './imx.model';
import { LeaderBoardModule } from 'src/leaderboard/leaderBoard.module';
import { MetadataModule } from 'src/metadata/metadata.module';


@Module({
  imports: [
    LeaderBoardModule,
    MetadataModule,
    MongooseModule.forFeature([{ name: 'Imx', schema: ImxSchema }]),
  ],
  controllers: [ImxController],
  providers: [ImxService],
  exports:[ImxService]
})
export class ImxModule {}
