import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './question.model';
import { CreateQuestiontDto, QueryQuestiontDto } from './dto';

@Injectable()
export class QuestionService {
  constructor(@InjectModel('Question') private readonly questionModel: Model<Question>) {}


  async create(question: CreateQuestiontDto): Promise<Question> {
    const createQuestion = new this.questionModel(question);
    return createQuestion.save();
  }

  async findAll(queryQuestiont: QueryQuestiontDto): Promise<Question[]> {
    return this.questionModel.find(queryQuestiont, { correctIndex:0 } ).exec();
  }

  async findOne(questionId: string): Promise<Question> {
    return this.questionModel.findById(questionId).exec();
  }

  async findByChestId(chestId: string): Promise<Question> {
    return this.questionModel.findOne({ chestId }, { correctIndex:0 }).exec();
  }

}

