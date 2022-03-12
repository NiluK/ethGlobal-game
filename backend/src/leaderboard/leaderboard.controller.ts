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
  import { LeaderBoardService } from './leaderBoard.service';
  import { QueryLearderBoardDto } from './dto';

  
  @Controller('leaderboard')
  export class LeaderBoardController {
    constructor( private readonly leaderBoardService: LeaderBoardService) {
    }
  
    @Get()
    async getLeaderBoard(@Query() queryLearderBoard:QueryLearderBoardDto): Promise<any> {
      return this.leaderBoardService.getLeaderBoard(queryLearderBoard);
    }
  
  }
  