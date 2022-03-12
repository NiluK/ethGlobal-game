import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Param,
  HttpException,
  Patch,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestiontDto, QueryQuestiontDto } from './dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async create(@Body() createQuestiontDto: CreateQuestiontDto) {
    if(createQuestiontDto.accessToken != "G6TmTNjdwTu7e33tRMa8Rg7") throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    return await this.questionService.create(createQuestiontDto);
  }

  @Get()
  async findAll(@Query() queryQuestionDto: QueryQuestiontDto): Promise<any> {
    return this.questionService.findAll(queryQuestionDto);
  }

  @Get(':chestId')
  async getOne(@Param() params): Promise<any> {
    return this.questionService.findByChestId(params.chestId);
  }

}
