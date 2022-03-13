import * as moongose from 'mongoose';

export const QuestionSchema = new moongose.Schema({
    questionTitle: String,
    questionText: String,
    questionLevel: Number,
    options: [{ text: String }],
    correctIndex: Number,
    questionCategory: String,
    chestId: String,
    token: { name: String, image_url:String },
});


export interface Options {
    text: string;
}

export interface Token {
    name: string;
    image_url:string
}

export interface Question extends moongose.Document {
    questionTitle: String;
    questionText: String;
    questionLevel: Number;
    correctIndex: Number;
    questionCategory: String;
    chestId: String;
    options:Array<Options>;
    token:Token;
}