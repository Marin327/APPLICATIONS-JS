import * as api from '../api.js';

const pageSize = '4';
const endpoints = {
    allCars: `/data/cars?pageSize=${pageSize}&offset=`,
    allCount: `/data/cars?count`,
    recipeById: '/data/cars/',
    login: '/users/login'
}

export async function getAllCars(search, page) {
    let dataUrl = endpoints.allCars + (page - 1) * pageSize;
    let sizeUrl = endpoints.allCount;
    if (search){
        const searchString = '&where=' + encodeURIComponent(`make LIKE "${search}"`);
        dataUrl += searchString;
        sizeUrl += searchString;
    }
    const [cars, size] = await Promise.all([
        api.get(dataUrl),
        api.get(sizeUrl)]);
    return {
        cars,
        pages: Math.ceil(size / pageSize)
    };
}

export async function getCars(id) {
    return api.get(endpoints.recipeById + id);
}

export async function login(user) {
    return api.post(endpoints.login, user);
}
