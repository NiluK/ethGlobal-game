import { IsNumber, IsOptional, IsDefined } from 'class-validator';
  
export class ClaimDto {

    @IsDefined()
    tokenId:number
}