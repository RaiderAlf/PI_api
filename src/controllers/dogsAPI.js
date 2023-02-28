const { dataAPI, DBDogs , filterDogs} = require('../services/index');
require('dotenv').config();
const { API_KEY } = process.env;

const APIDogs = async (req, res) => {

    const allDogs = [... await dataAPI(API_KEY), ... await DBDogs()];

    res.status(200).json({
        message: `All Dogs`,
        body: allDogs
    });
};

const filterByNameAPI = async (req , res) => {
    const { name } = req.query;

    const allDogs = [... await dataAPI(API_KEY), ... await DBDogs()];


    res.status(200).json({
        message: `Dogs by name: ${name}`,
        body: filterDogs(name, allDogs)
    });
};

const filterByIdAPI = async (req, res) => {
        const {id} = req.params;

        const allDogs = [... await dataAPI(API_KEY), ... await DBDogs()];

        res.status(200).json({
            message: `Dog ${id}`,
            body: allDogs.filter(dogs => dogs.id == id)
        });
};

module.exports = {
    APIDogs,
    filterByIdAPI,
    filterByNameAPI
};