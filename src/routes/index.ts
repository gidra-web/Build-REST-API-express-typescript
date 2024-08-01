import {Express, Request, Response} from 'express';
import {createUserHandler} from '../controller/user.controller';
import {createSessionHandler, getUserSessionsHandler } from '../controller/session.controller';
import validate from '../middleware/validate';
import { createUserSchema } from '../schema/user.schema';
import { createSessionSchema } from '../schema/session.schema';

const routes = (app: Express) => {
    app.post('/api/users', validate(createUserSchema), createUserHandler);

    app.post('/api/sessions', validate(createSessionSchema), createSessionHandler)

    app.get('/api/sessions', getUserSessionsHandler)
    };


export default routes;