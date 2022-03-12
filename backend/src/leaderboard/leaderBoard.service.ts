import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from '../answer/answer.model';
import { QueryLearderBoardDto } from './dto';

@Injectable()
export class LeaderBoardService {
  constructor(@InjectModel('Answer') private readonly answerModel: Model<Answer>) {}

  async getLeaderBoard(queryLearderBoard:QueryLearderBoardDto): Promise<any> {
    const match: any = {};
    if(queryLearderBoard.user) match.user = queryLearderBoard.user;
    match.isCorrect = true;
    return this.answerModel.aggregate([
      { $match : match },
      {
         $group: { 
            _id: "$user", 
            count: { $sum: 1},
         }
      },
      {
        $sort:{'count':1 }
      },
      { $project: { "user": "$_id", "count":1 }}
    ]).sort({ count: 'descending' })
  }

}

