import { IsNumber, IsOptional, IsDefined , IsMongoId} from 'class-validator';
  
export class CreateMetadataDto {
    @IsDefined()
    name: string;

    @IsDefined()
    image_url:String

    @IsDefined()
    tokenId:String
}