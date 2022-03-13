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
  
    @Get(':tokenId')
    async findByNftId(@Param() parameter): Promise<any> {
      const tokenId = parameter.tokenId;
      return await this.metadataService.findByNftId(tokenId);
    }
 
  }
  