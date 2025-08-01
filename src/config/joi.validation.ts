import * as joi from 'joi';

export const JoiValidationSchema = joi.object({
    MONGODB: joi.required(),
    PORT: joi.number().default(3001),
    DEFAULT_LIMIT: joi.number().default(6),
  //NODE_ENV: joi.string().valid('development', 'production', 'test').default('development'),
  //DATABASE_URL: joi.string().uri().required(),
  //JWT_SECRET: joi.string().min(32).required(),
  //API_KEY: joi.string().optional(),
});
