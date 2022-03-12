import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from './answer.model';

@Injectable()
export class AnswerService {
  constructor(@InjectModel('Answer') private readonly answerModel: Model<Answer>) {}

  async create(answer): Promise<Answer> {
    const createAnswer = new this.answerModel(answer);
    return createAnswer.save();
  }

  async findAnswer(query): Promise<Answer> {
    return this.answerModel.findOne(query);
  }
}

