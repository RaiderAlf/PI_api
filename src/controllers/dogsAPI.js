//-------------------------------------CONTROLLERS--------------------------------------//

//IMPORTS
const { dataAPI, DBDogs , filterDogs, temperamentsDB, createDog} = require('../services/index');
require('dotenv').config();
//API KEY
const { API_KEY } = process.env;


//RES BY GET ALLDOGS
const APIDogs = async (req, res) => {
    const allDogs = [ ... await DBDogs(),... await dataAPI(API_KEY)];

    //SUCCESS RES
    res.status(200).json({
        message : `All Dogs`,
        results : allDogs
    });
};

//RES FILTER BY NAME
const filterByNameAPI = async (req , res) => {
    const { name } = req.query;

    const allDogs = [... await dataAPI(API_KEY), ... await DBDogs()];

    const filter = filterDogs(name, allDogs);

    //ERROR RES
    if(filter.length == 0){
        res.status(404).json({
            error : `Dogs by name: ${name}, not found`
        });
        return;
    };

    //SUCCESS RES
    res.status(200).json({
        message : `Dogs by name: ${name}, found`,
        results : filterDogs(name, allDogs)
    });
};

//RES FILTER BY ID
const filterByIdAPI = async (req, res) => {
    const {id} = req.params;

    const allDogs = [... await dataAPI(API_KEY), ... await DBDogs()];

    const filter = allDogs.filter(dogs => dogs.id == id);

    //ERROR RES
    if(filter.length == 0){
        res.status(404).json({
            error : `Dogs by ID: ${id}, not found`
        });
        return;
    };

    //SUCCESS RES
    res.status(200).json({
        message : `Dog by ID: ${id}, found`,
        results : filter
    });
};

//RES BY GET ALL TEMPERAMENTS
const getTemperament = async (req, res) => {

    //SUCCESS RES
    res.status(200).json({
        message : 'All Temperaments available',
        results : await temperamentsDB(API_KEY)
    });
};

//POST TO DB
const addDB = async (req, res) => {

    const dogCreated = await createDog(req)

    //SUCCESS RES
    res.status(201).json({
        message : 'DOG CREATED',
        results : dogCreated
    });
};

module.exports = {
    APIDogs,
    filterByIdAPI,
    filterByNameAPI,
    addDB,
    getTemperament
};