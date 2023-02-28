const axios = require('axios');
const { Dog, Temperaments } = require('../db');

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
}

const dataAPI = async (API) => {
    let fetchDogs
    await axios.get(`https://api.thedogapi.com/v1/breeds?${API}`)
        .then(response => {
            fetchDogs = response.data;
        });

    return await indexInf(fetchDogs);
};

const DBDogs = async ( ) =>{
    const response = await Dog.findAll({
        include: Temperaments
    })

    return await indexInf(response)
}

const filterDogs = (name, allDogs) => {
    const dog =[];
        for(let i = 0 ; i < allDogs.length ; i++){
            if(allDogs[i].name.toLowerCase().includes(name.toLowerCase())){
                dog.push(allDogs[i]);
            };
        }
        return dog;
};

module.exports = {
    dataAPI,
    filterDogs,
    DBDogs
};