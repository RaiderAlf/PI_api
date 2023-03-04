// -------------------------------------------------- MIDDLEWARE ------------------------------------------------------//

//Validation Query Client
const validationQuery = () => {
    return (req, res, next) => {
        if(req.query.hasOwnProperty('name')){
            const data = req.query.name;
            const regex = /[A-Za-zÀ-ÿ]/;

            const matches = data.match(regex);

            if(!matches){
                //ERROR VALIDATION
                res.status(400).json({
                    error: `${data} is invalid`,
                    message: 'Must be a string'
                });
                return;
            };
            return next();
        };
        return next();
    };
};

//validation ID Client
const validationID = () => {
    return (req, res, next) => {
        const data = req.params.id;
        const regex = /^\d{1,3}$/;

        const matches = data.match(regex);

        if(!matches){
            //ERROR VALIDATION
            res.status(400).json({
                error : `${data} is invalid`,
                message : 'Must be a number'
            });
            return;
        };
        return next();
    };
};

const validationPOST = () => {
    return (req, res, next) => {
        const data = req.body;

        if(data.hasOwnProperty('name') && data.hasOwnProperty('weightMin') && data.hasOwnProperty('weightMax') && data.hasOwnProperty('heightMin') && data.hasOwnProperty('heightMax') && data.hasOwnProperty('lifeSpan') && data.hasOwnProperty('image') && data.hasOwnProperty('temperament')){
            return next();
        };

        //ERROR VALIDATION
        res.status(400).json({
            error : 'Missing Information'
        });
        return;
    };
};

module.exports = {
    validationQuery,
    validationID,
    validationPOST
}