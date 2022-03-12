import { Module } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { MetadataController } from './metadata.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MetadataSchema } from './metadata.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Metadata', schema: MetadataSchema }]),
  ],
  controllers: [MetadataController],
  providers: [MetadataService],
  exports:[MetadataService]
})
export class MetadataModule {}
