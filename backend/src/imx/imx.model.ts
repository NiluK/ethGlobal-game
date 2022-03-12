import * as moongose from 'mongoose';

export const ImxSchema = new moongose.Schema({
    tokenId: Number,
    user:String,
    inWallet:Boolean
});

export interface Imx extends moongose.Document {
    tokenId: number;
    user:string;
    inWallet:boolean;
}