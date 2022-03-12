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

  
  @Controller('leader-board')
  export class LeaderBoardController {
    constructor( private readonly leaderBoardService: LeaderBoardService) {
      console.log("HDFNDKFND KDNFKJDNF")
    }
  
    @Get()
    async getLeaderBoard(@Query() queryLearderBoard:QueryLearderBoardDto): Promise<any> {
      return this.leaderBoardService.getLeaderBoard(queryLearderBoard)

    }
  
  }
  