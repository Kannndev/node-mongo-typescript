import * as joi from 'joi';

export class UserJoiSchema {
    public postUserSchema() {
        return joi.array().items(
            joi.object({
                age: joi.number().integer().min(1).max(100).required(),
                email: joi.string().email().required(),
                name: joi.string().min(2).required(),
                userId: joi.string().min(6).required(),
            }),
        );
    }

    public updateUserSchema() {
        return joi.object({
            age: joi.number().integer().min(1).max(100),
            email: joi.string().email(),
            name: joi.string().min(2),
            userId: joi.string().min(6),
        }).min(1);
    }
}
