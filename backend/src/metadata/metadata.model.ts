import * as moongose from 'mongoose';

export const MetadataSchema = new moongose.Schema({
    name: String,
    animation_url: String,
    animation_url_mime_type: String,
    image_url:String,
    tokenId:String
});


export interface Metadata extends moongose.Document {
    name: string;
    animation_url: string;
    animation_url_mime_type: string;
    image_url:string
    tokenId:string;
}