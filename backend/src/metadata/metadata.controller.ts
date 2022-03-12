import {
    Controller,
    Post,
    Body,
    HttpException,
    Query,
    Get,
    HttpStatus,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  import { MetadataService } from './metadata.service';

  
  @Controller('metadata')
  export class MetadataController {
    constructor(
      private readonly metadataService:MetadataService) {}
  
    @Get(':nftId')
    async findByNftId(@Param() parameter): Promise<any> {
      const nftId = parameter.nftId;
      return await this.metadataService.findByNftId(nftId)
    }
 
  }
  