import Joi from "joi";

export const transactionSchema = Joi.object({
    price: Joi.number().required(),
    active: Joi.string().required()
})