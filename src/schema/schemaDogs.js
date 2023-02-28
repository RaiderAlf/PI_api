const Joi = require('joi');

const id = Joi.number().integer();
const name =Joi.string().required();

const schemaFilter = Joi.object({
    id: id.required()
})

const schemaName = Joi.object({
    name: name.required().pattern(new RegExp('^[a-zA-Z ]+$'))
})

module.exports = {
    schemaFilter,
    schemaName
}

