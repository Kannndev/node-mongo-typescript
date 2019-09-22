import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { UserController } from './users/user.controller';
import { mongooseObj } from './configs/mongoose.config';
import { config } from './configs/config';

const app = express();

const corsOption = {
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: true,
};

app.use(cors(corsOption));

app.use(bodyParser.json());

app.use('/api', new UserController().router);

app.listen(config.port);

(async () => {
    await mongooseObj.setConnection();
})();


console.log(`Server running at http://localhost:${config.port}/`);
