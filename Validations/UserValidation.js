import Joi from 'Joi'
import validateRequest from './validate.js';

const strongPasswordRegex = /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$/;
const stringPassswordError = 'Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length';

export const signup = (req, res, next) => { 
    const schema =  Joi.object().keys({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().trim()
          .lowercase().messages({
            'string.email': 'Email must be a valid email',
            'string.empty': 'Email cannot be an empty field',
            'any.required': 'Email is a required field',
          }),
        password: Joi.string().regex(strongPasswordRegex).required().messages({
          'string.empty': 'Password is required',
          'string.pattern.base': stringPassswordError,
        }),
        firstname: Joi.string().required().max(20).min(3).trim(),
        lastname: Joi.string().required().max(20).min(3).trim(),
        phoneNumber: Joi.string().trim(),
        userType: Joi.string().valid('advertiser', 'affiliate')
      });
    validateRequest (req, next, schema)
} 

export const signin = (req, res, next) => { 
    const schema =  Joi.object().keys({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().trim()
          .lowercase().trim(),
        password: Joi.string().required().trim()
    })
    validateRequest (req, next, schema)
} 