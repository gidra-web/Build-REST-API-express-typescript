import 'dotenv/config';
import  jwt  from "jsonwebtoken";

const secret = process.env.SECRET_KEY;
const publicKey = process.env.PUBLIC_KEY;

export function signJwt(
    object: Object,
    options?: jwt.SignOptions | undefined
){
    return jwt.sign(object, secret as string, {
        ...(options && options), //check if options is defined
        algorithm:'RS256'
    });
}

export function verifyJwt(token: string){
    try {
        const decoded = jwt.verify(token, publicKey as string)

        return {
            validate: true,
            expired: false,
            decoded
        }

    } catch (e: any) {
        return {
            validate: false,
            expired: e.message === 'jwt expired',
            decoded: null
        }
    }
}