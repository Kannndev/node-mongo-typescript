import { NextFunction, Request, Response } from 'express';
import { UserDao } from './user.dao';

export class UserManager {

    public createUsers(data) {
        return new Promise((resolve, reject) => {
            UserDao.bulkInsert(data, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    public getUsers() {
        return new Promise((resolve, reject) => {
            UserDao.get({}, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    public getUserById(userId) {
        return new Promise((resolve, reject) => {
            UserDao.getByUserId({ userId }, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    public deleteUser(userId) {
        return new Promise((resolve, reject) => {
            UserDao.delete({ userId }, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    public updateUser(userId, updatedValues) {
        return new Promise((resolve, reject) => {
            UserDao.update({ userId }, updatedValues, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
}
