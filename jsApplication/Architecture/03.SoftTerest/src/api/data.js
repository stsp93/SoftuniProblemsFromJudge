import * as api from './api.js'

const endpoints = {
    create: '/data/ideas',
    ideas: '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',

}

export async function createIdea(ideaData) {
   return api.post(endpoints.create, ideaData);
}

export async function loadAllIdeas() {
    return api.get(endpoints.ideas);
}

export async function getById(id) {
    return api.get(endpoints.create + id);
}

export async function deleteIdea(id){
    return api.del(endpoints.create + id);
}