import Joi from "joi";

export const signUpShecma = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
  verifyPassword: Joi.string().min(3).required(),
});

export const loginShecma = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
