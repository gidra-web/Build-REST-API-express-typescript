import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {createSession} from "../service/session.service";

export async function createSessionHandler(req: Request, res: Response){
    //validate user's password
    const user = await validatePassword(req.body);
    if(!user) {
        res.status(401);
        return;
    }
    //create a session
    const session = createSession(user._id.toString(), req.get("user-agent") || "");
    //create an access token

    //create a refresh token

    //return access & refresh token
}