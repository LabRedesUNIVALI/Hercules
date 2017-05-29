'use strict';

const joi = require('joi');

const envVarsSchema = joi.object({
    NODE_ENV: joi.string()
        .allow(['development', 'production', 'test'])
        .required(),
    PORT: joi.number()
        .required(),
    MONGODB_URL: joi.string()
        .required()
});

const { error, value: envVars } = joi.validate(
    process.env,
    envVarsSchema,
    { allowUnknown: true }
);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    isTest: envVars.NODE_ENV === 'test',
    isDevelopment: envVars.NODE_ENV === 'development',
    server: {
        port: envVars.PORT,
        mongodbUrl: envVars.MONGODB_URL
    }
};

module.exports = config;
