import * as api from "./api.js";

let pageSize = 2;

let endpoints = {
    byId: '/data/recipes/',
    create: "/data/recipes",
    update: "/data/recipes/",
    delete: "/data/recipes/",
    count: "/data/recipes?count",
    recent: '/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=3',
    recipes: `/data/recipes?sortBy=_createdOn%20desc&pageSize=${pageSize}&offset=`,
}

export async function getRecent() {
    return api.get(endpoints.recent)
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function getAll(search, page = 1) {
    let dataUrl = endpoints.recipes + (page - 1) * pageSize;
    let sizeUrl = endpoints.count;
    if (search){
        const searchString = '&where=' + encodeURIComponent(`name LIKE "${search}"`);
        dataUrl += searchString;
        sizeUrl += searchString;
    }
    const [recipes, count] = await Promise.all([
        api.get(dataUrl),
        api.get(sizeUrl)]);
    return {
        recipes,
        pages: Math.ceil(count / pageSize)
    };
}

export async function create(data) {
    return api.post(endpoints.create, data)
}

export async function update(id, data) {
    return api.put(endpoints.update + id, data)
}

export async function deleteRecipe(id) {
    return api.del(endpoints.delete + id)
}
