import * as moongose from 'mongoose';

export const AnswerSchema = new moongose.Schema({
    questionId: String,
    answerIndex: Number,
    user:String,
    isCorrect: Boolean
});


export interface Answer extends moongose.Document {
    questionId: String;
    answerIndex: Number;
    isCorrect: Boolean;
    user:String
}