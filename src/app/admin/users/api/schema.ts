import Joi from "joi";

export const userCreateSchema = Joi.object({
    username: Joi.string().required().lowercase(),
    email: Joi.string().required().lowercase(),
    status: Joi.string().valid('ACTIVE', 'INACTIVE').required(),
    password: Joi.string().required(),
    confirm_password: Joi.string().valid(Joi.ref('password')).required(),
    role_id: Joi.number().required()
}).unknown(true);

export const userUpdateSchema = Joi.object({
    role_id: Joi.number().optional().allow(''),
    username: Joi.string().optional().allow('').lowercase(),
    status: Joi.string().valid('ACTIVE', 'INACTIVE').optional().allow(''),
    password: Joi.string().optional().allow(''),
    confirm_password: Joi.string().valid(Joi.ref('password')).allow(''),
}).unknown(true);

