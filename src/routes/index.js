//----------------------------------------------------------ROUTES-----------------------------------------//

//IMPORTS
const { Router } = require('express');
//MIDDLEWARES
const { validationQuery, validationID, validationPOST } = require('../middleware/validationHandler');
//CONTROLLERS
const { filterByIdAPI, APIDogs, filterByNameAPI, addDB, getTemperament } = require('../controllers/dogsAPI');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//GET ALL DOGS FROM API AND DB & BY QUERY NAME
router.get('/dogs', validationQuery(), (req, res) => {
    if(!req.query.hasOwnProperty('name')){
        APIDogs(req, res);
        return;
    }
    filterByNameAPI(req, res)
});

//GET DOG FROM API BY ID
router.get('/dogs/:id', validationID(), async (req, res) => {
    await filterByIdAPI(req, res)   
});

//CREATE DOG IN DB
router.post('/dogs', validationPOST(), async (req, res) => {
    await addDB(req, res)
});

//GET TEMPERAMENTS FROM DB
router.get('/temperament', async (req, res) => {
  await getTemperament(req, res)
})

module.exports = router;