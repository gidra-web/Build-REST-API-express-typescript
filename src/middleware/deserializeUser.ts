import {get} from 'lodash'
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";

export const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
    //need to get out access token from the req headers
    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
      );

    if(!accessToken) return next();

    const {decoded,expired} = verifyJwt(accessToken);

    if (!res.locals.user) {
        return res.sendStatus(403);
      }
    
      return next();

    if(decoded){
        res.locals.user = decoded;
        return next();
    }

    return next();
}