const { Router } = require('express');
require('dotenv').config();
const { validationQuery, validationID, validationPOST } = require('../middleware/validationHandler')
const { filterByIdAPI, APIDogs, filterByNameAPI } = require('../controllers/dogsAPI');
const { Dog, Temperament} = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', validationQuery(), (req, res) => {
    if(!req.query.hasOwnProperty('name')){
        APIDogs(req, res);
        return;
    }
    filterByNameAPI(req, res)
});

router.get('/dogs/:id', validationID(), async (req, res) => {
    await filterByIdAPI(req, res)   
});

router.post('/dogs', validationPOST(), async (req, res) => {
    try {
        // Create the dog
        const dog = await Dog.create(req.body);
        // Get the list of temperament ids from the request
        const temperaments = req.body.temperaments;
        // Create the relations between the dog and the temperaments
        await dog.setTemperaments(temperaments);
        // Get the updated dog with all the relations
        const updatedDog = await Dog.findById(dog.id, {
          include: [{ model: Temperament }]
        });
        // Send the response
        res.status(200).json(updatedDog);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
})

module.exports = router;
