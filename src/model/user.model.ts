import 'dotenv/config'
import { Schema, model, Document} from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document{
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
},
{timestamps: true})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(parseInt(`${process.env.SALT_ROUND}`));
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();

    console.log(this.password)
    console.log(hash)
    console.log(salt)
})

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password).catch(err => false);
}

const UserModel = model<IUser>('User', userSchema);

export {UserModel, IUser};