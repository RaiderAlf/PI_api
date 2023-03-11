//---------------------------------------SERVICES------------------------------//

//IMPORTS
const axios = require('axios');
//MODELS DB
const { Dog, Temperament } = require('../db');

//INFO MAPPING
const indexInf = async (info) => {
    const index = await info.map(dog => {
        return {
            id: dog.id,
            name: dog.name.toLowerCase(),
            temperament: dog.temperament,
            weight: dog.weight.metric,
            height : dog.height.metric,
            lifeSpan: dog.life_span,
            image: dog.image.url
        }
    })
    return index
};

//API FETCH
const dataAPI = async (API) => {
    let fetchDogs
    await axios.get(`https://api.thedogapi.com/v1/breeds?${API}`)
        .then(response => {
            fetchDogs = response.data;
        });

    return await indexInf(fetchDogs);
};

//DATABASE FETCH
const DBDogs = async ( ) =>{

    const response = await Dog.findAll({
        include: Temperament
    })

    let dogList = []
    dogList = await response.map(dog => {
        return {
            id: dog.id,
            name: dog.name.toLowerCase(),
            weight: dog.weight,
            height: dog.height,
            temperament: dog.Temperaments[0].name ,
            image: dog.image,
            lifeSpan: dog.lifeSpan,
            createdInDb : true
        }
    })
    return dogList

};

//FILTER BY NAME
const filterDogs = (name, allDogs) => {
    const dog =[];
        for(let i = 0 ; i < allDogs.length ; i++){
            if(allDogs[i].name.toLowerCase().includes(name.toLowerCase())){
                dog.push(allDogs[i]);
            };
        };
        return dog;
};

//GET ALL TEMPERAMENTS
const temperamentsDB = async (api) => {

    const tempDB = await Temperament.findAll();

    if( await tempDB.length < 3){
        const tempAPI = await dataAPI(api);
        const temperaments = tempAPI.map(el => el.temperament);

        let dataTamperament = temperaments.join().split(',');
        dataTamperament = dataTamperament.map( el => el.trim());

        dataTamperament.forEach (el => {
            if(el !== '') {
                Temperament.findOrCreate({
                    where: { name: el }    
                });
            };
        });
        return await tempDB
    };

    return await tempDB;
};

//CREATE DOG IN DB
const createDog = async (req) => {
    const {
        name, 
        image, 
        heightMin,
        heightMax,  
        weightMin,
        weightMax, 
        lifeSpan,
        temperament 
      } = req.body;
    
      const height = [ heightMin, " - ", heightMax].toString().replace(/,/g, "");
      const weight = [ weightMin, " - ", weightMax ].toString().replace(/,/g, "");

      const dogCreated = await Dog.create({
        name, 
        image, 
        height,
        weight,
        lifeSpan,
      });
    
      const temperamentDB = await Temperament.findAll({
        where : { 
            name : temperament 
        }
      });
    
      await dogCreated.addTemperament(temperamentDB);

      return dogCreated;
};

module.exports = {
    dataAPI,
    filterDogs,
    DBDogs,
    temperamentsDB,
    createDog
};