import { Express, Request, Response } from 'express';
import 'dotenv/config'
import { Schema, model, Document} from 'mongoose';
import bcrypt from 'bcrypt';

export interface ISession extends Document{
    user: ISession['_id'];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
}

const sessionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: {type: String}
},
{timestamps: true})

const SessionModel = model('User', sessionSchema);

export default SessionModel;