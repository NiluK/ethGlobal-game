import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Metadata } from './metadata.model';
import { CreateMetadataDto } from './dto';


@Injectable()
export class MetadataService {
  constructor(@InjectModel('Metadata') private readonly metadataModel: Model<Metadata>) {}

  async findByNftId(tokenId: string): Promise<Metadata> {
    return this.metadataModel.findOne({ tokenId }, { _id:0, tokenId: 0, __v:0}).exec();
  }

  async create(createMetadata: CreateMetadataDto): Promise<Metadata> {
    const metadata = new this.metadataModel(createMetadata);
    return metadata.save();
  }

  async createWithRandom(tokenId: string): Promise<Metadata> {
    const optionMeta:CreateMetadataDto[] = [
      { tokenId, name:"T earth",  image_url:'https://bafybeicmbuenrw3rxptqfipejy5blcuxwh52y62i4vylz6gnb5l7rwa6fe.ipfs.dweb.link/earth-g50a42cba7_1920.jpg' },
      { tokenId, name:"earth clock",  image_url:'https://bafybeidrm26cbv6vtvgbhwdi23yrluc7yvfp45l3tersphsjjm4ohwvyq4.ipfs.dweb.link/globe-g6b37e4cf3_1920.jpg' },
      { tokenId, name:"Melting earth",  image_url:'https://bafkreibs3ogmxezzdoinu2kjj3bp7kdlbgtginrzbrhxye2a2likqrilo4.ipfs.dweb.link' },
    ]
    const randomIndex = Math.floor(Math.random() * optionMeta.length);
    const metadata = new this.metadataModel(optionMeta[randomIndex]);
    return metadata.save();
  }
}

