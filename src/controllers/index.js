const axios = require('axios');

const dataAPI = async (API) => {
    let fetchDogs
    await axios.get(`https://api.thedogapi.com/v1/breeds?${API}`)
        .then(response => {
            fetchDogs = response.data;
        });

    return fetchDogs;
};

const filterDogs = (name, allDogs) => {
    const dog =[];

    if(allDogs.find(item => item.name.toLowerCase().includes(name.toLowerCase()))){
        for(let i = 0 ; i < allDogs.length ; i++){
            if(allDogs[i].name.toLowerCase().includes(name.toLowerCase())){
                dog.push(allDogs[i]);
            };
        }
        return dog;
    }else{
        throw new Error(`${name} not Found`);
    } 
    
};

module.exports = {
    dataAPI,
    filterDogs
};