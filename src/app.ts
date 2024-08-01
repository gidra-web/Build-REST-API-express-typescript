import express from 'express';
import 'dotenv/config'
import log from './utils/logger';
import connect from './utils/connect';
import routes from './routes';
import { deserializeUser } from './middleware/deserializeUser';
import {UserModel} from './model/user.model';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(deserializeUser);

routes(app);

app.listen(process.env.DEV_PORT, async() => {
    log.info(`LINK: http://localhost:${process.env.DEV_PORT}`);
    log.info(`Server is running on port ${process.env.DEV_PORT}`);
    await connect();

    // const { _id: id } = await UserModel.create({ email: 'admin5@email', name: 'admin', password: 'admin' });
    // const user = await UserModel.find().exec();

    // console.log(user);
} );