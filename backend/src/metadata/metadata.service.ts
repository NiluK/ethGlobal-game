import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Metadata } from './metadata.model';
import { CreateMetadataDto } from './dto';


@Injectable()
export class MetadataService {
  constructor(@InjectModel('Metadata') private readonly metadataModel: Model<Metadata>) {}

  async findByNftId(nftId: string): Promise<Metadata> {
    return this.metadataModel.findOne({ nftId }).exec();
  }

  async create(createMetadata: CreateMetadataDto): Promise<Metadata> {
    const metadata = new this.metadataModel(createMetadata);
    return metadata.save();
  }

  async createWithRandom(tokenId: string): Promise<Metadata> {
    const optionMeta:CreateMetadataDto[] = [
      { tokenId, image_url:"",  name:'' },
      { tokenId, image_url:"",  name:'' },
      { tokenId, image_url:"",  name:'' },
      { tokenId, image_url:"",  name:'' }
    ]
    const randomIndex = Math.floor(Math.random() * optionMeta.length);
    const metadata = new this.metadataModel(optionMeta[randomIndex]);
    return metadata.save();
  }
}

