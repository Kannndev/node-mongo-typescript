import mongoose from 'mongoose';
import { UserSchema } from './user.model';

UserSchema.statics = {
    create(data, cb) {
        const hero = new this(data);
        hero.save(cb);
    },

    get(query, cb) {
        this.find(query, cb);
    },

    getByUserId(query, cb) {
        this.find(query, cb);
    },

    update(query, updateData, cb) {
        this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
    },

    delete(query, cb) {
        this.findOneAndDelete(query, cb);
    },

    bulkInsert(data, cb) {
        this.insertMany(data, cb);
    },
};

export const UserDao = mongoose.model('User', UserSchema);
