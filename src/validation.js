//VALIDATION
const Joi = require('@hapi/joi');


//Registrtion Validation
const registerValidation = (data) => {
    const userValidSchema = Joi.object({
        username : Joi.string().min(6).max(20).required(),
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(8).required(),
    })
    return userValidSchema.validate(data);

}
//Login validation 

const loginValidation = (data) => {
    const loginValidSchema = Joi.object({
        username : Joi.string().min(6).max(20).required(),
        password : Joi.string().min(8).required()
    })
    return loginValidSchema.validate(data);
}

const postValidation = (data) => {
    const postValidationSchema = Joi.object({
        title : Joi.string().min(10).max(50).required(),
        description : Joi.string().min(20).max(300),
        tags : Joi.string().max(100)
    })
    return postValidationSchema.validate(data);
}

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
module.exports.postValidation = postValidation;

