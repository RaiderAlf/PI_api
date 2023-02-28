const boom = require('@hapi/boom');

function validatorHandler (schema, property){
    return (req, res, next) => {
        const data = req[property];
        const {error} = schema.validate(data);
        if(error) {
            res.json(boom.badRequest())
            return;
        }
        next()
    }
}

module.exports = {validatorHandler}