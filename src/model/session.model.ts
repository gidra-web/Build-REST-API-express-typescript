import 'dotenv/config'
import { Schema, model, Document} from 'mongoose';
import {IUser} from './user.model';

export interface ISession extends Document{
    user: IUser['_id'];
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

const SessionModel = model('Session', sessionSchema);

export default SessionModel;