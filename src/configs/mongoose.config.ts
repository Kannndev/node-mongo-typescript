import mongoose from 'mongoose';
import { config } from './config';

class MongooseConfig {
    private mongooseConnection;

    public async setConnection() {
        this.mongooseConnection = await mongoose.createConnection(config.dbConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, (err) => {
            if (err) {
                console.log('Some problem with the connection ' + err);
            } else {
                console.log('The Mongoose connection is ready');
            }
        });
    }

}

export const mongooseObj = new MongooseConfig();
