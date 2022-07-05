import axios from 'axios';

export const getBreweries = (searchText = '') => {
    if(searchText) {
        return new Promise((resolve, reject) => {
            axios.get(`https://api.openbrewerydb.org/breweries/search?query=${searchText}`)
            .then(({data}) => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        })
    } else {
        return new Promise((resolve, reject) => {
            axios.get(`https://api.openbrewerydb.org/breweries`)
            .then(({data}) => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        })
    }
}

export const getBrewery = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.openbrewerydb.org/breweries/${id}`)
        .then(({data}) => {
            resolve(data);
        }).catch(err => {
            reject(err);
        })
    })
}