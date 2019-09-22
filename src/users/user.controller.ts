import { NextFunction, Request, Response, Router } from 'express';
import * as fs from 'fs';
import multer from 'multer';
import xml2js from 'xml2js';
import { ValidatorHelper } from '../helpers/joi.validator';
import { UserJoiSchema } from '../helpers/users.schema';
import { UserManager } from './user.manager';

export class UserController {

    public router: Router;
    public userManager: UserManager;
    public validator: ValidatorHelper;

    constructor() {
        this.router = Router();
        this.configRoutes();
        this.userManager = new UserManager();
        this.validator = new ValidatorHelper();
    }

    public configRoutes() {
        this.router.get('/users', this.getAllUsers);
        this.router.get('/users/:userId', this.getUser);
        this.router.post('/users', this.checkUploadPath, multer({ dest: './import' }).single('file'), this.postUser);
        this.router.put('/users/:userId', this.updateUser);
        this.router.delete('/users/:userId', this.deleteUser);
    }

    public getUser = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result = await this.userManager.getUserById(request.params.userId);
            response.status(200).send(result);
        } catch (error) {
            return response.status(500).send(error);
        }
    }

    public getAllUsers = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result = await this.userManager.getUsers();
            response.status(200).send(result);
        } catch (error) {
            return response.status(500).send(error);
        }
    }

    public postUser = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const fileData = fs.readFileSync(request.file.path);
            const parser = new xml2js.Parser({ explicitArray: false, trim: true, async: true });
            const jsonData = await new Promise((resolve, reject) => {
                parser.parseString(fileData, (error, data) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(data.users.user);
                });
            });
            const validJson = await this.validator.jsonValidator(new UserJoiSchema().postUserSchema(), jsonData);
            const result = await this.userManager.createUsers(validJson);
            response.status(200).send(result);
        } catch (error) {
            response.status(500).send(error);
        } finally {
            fs.unlinkSync(request.file.path);
        }
    }

    public updateUser = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const validJson = await this.validator.jsonValidator(new UserJoiSchema().updateUserSchema(), request.body);
            const result = await this.userManager.updateUser(request.params.userId, validJson);
            response.status(200).send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    }

    public deleteUser = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result = await this.userManager.deleteUser(request.params.userId);
            response.status(200).send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    }

    private checkUploadPath(request: Request, response: Response, next: NextFunction) {
        const uploadPath = './import';
        fs.exists(uploadPath, (exists) => {
            if (exists) {
                next();
            } else {
                fs.mkdir(uploadPath, (err) => {
                    if (err) {
                        next();
                    }
                    next();
                });
            }
        });
    }
}
