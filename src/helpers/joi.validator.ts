import * as joi from 'joi';

export class ValidatorHelper {
    public jsonValidator(joiSchema: object, jsonValue: any) {
        return new Promise((resolve, reject) => {
            joi.validate(jsonValue, joiSchema, { stripUnknown: false })
                .then((res) => {
                    resolve(res);
                }).catch((error) => {
                    reject(new Error(error).toString());
                });
        });
    }
}
