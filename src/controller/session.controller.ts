import 'dotenv/config';
import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {createSession, getSession} from "../service/session.service";
import {signJwt} from '../utils/jwt';


export async function createSessionHandler(req: Request, res: Response){
    //validate user's password
    const user = await validatePassword(req.body);
    if(!user) {
        res.status(401);
        return;
    }
    //create a session
    const session = await createSession(user._id.toString(), req.get("user-agent") || "");


    //create an access token
    const accessToken = signJwt(
        {...user, session: session._id},
        { expiresIn: `${process.env.ACCESSTOKENTTL}` }
    );

    //create a refresh token

    const refreshToken = signJwt(
        {...user, session: session._id},
        { expiresIn: `${process.env.REFRESHTOKEN}` }
    );

    //return access & refresh token

    return res.send({accessToken, refreshToken});
}

export async function getUserSessionsHandler(req: Request, res: Response){
    const userId = res.locals.user._id

    const sessions = await getSession({user: userId, valid: true})

    return res.send(sessions)
}