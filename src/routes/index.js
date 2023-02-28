const { all } = require('axios');
const { Router } = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const dogsService = require('../controllers/index');
const boom = require('@hapi/boom');
// const { Dog, Temperament } = require('./db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.get('/dogs', async (req, res) => {
    const allDogs = await dogsService.dataAPI(API_KEY);

    if(req.query.hasOwnProperty('name')){
        try {
            const {name} = req.query;
            res.status(200).json({
                message: `Dogs has includes: ${name}`,
                body: dogsService.filterDogs(name, allDogs)
                });
            return;
        } catch (error) {
            res.status(400).json({
                error : error.message
            });
        };
    }else{
        try {
            res.status(200).json({
                message: 'All Dogs',
                body: allDogs
            })
        } catch (error) {
            res.json({
                error : error.massge
            })
        }
    }

});

// router.get('/dogs/:id', async (req, res) => {
//     try {
//         const {id} = req.params;
//         if(isNaN(id)){
//             res.status(400).json({
//                 message: 'Needed a number',
//                 error : `${id} no es un numero`
//             });
//             return;
//         };
//         const allDogs = await dogsService.dataAPI(API_KEY);
        
//         res.status(200).json({
//             message: `Dog ${id}`,
//             body: allDogs.filter(dogs => dogs.id == id)
//         });
//     } catch (error) {
//         res.json({
//             error : error.massge
//         });
//     };
// });

router.get('/dogs/:id', async (req, res) => { 
    try { 
        const dog = await Dog.findByPk(req.params.id, {
             include: [{ model: Temperament }] 
            }); 
        res.status(200).json(dog); 
    } catch (err) { 
        res.status(500).json({ error: err }); 
    } 
});

// router.get('/dogs/name', async (req, res) => {
//     const {name} = req.query
//     const dogs = await dogsService.dataAPI(API_KEY)
//     console.log(name)
        
//         res.status(200).json({
//             message: 'Query Dogs',
//             body: name
//     });
// })


module.exports = router;
