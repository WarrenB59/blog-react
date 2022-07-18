import axios from 'axios';

export const API_BACKEND = axios.create({baseURL:'https://localhost:8000'});

// Nos Endpoints
export const API_GET_ARTICLES = '/api/articles.json';
export const API_GET_ARTICLE_BY_ID = '/api/articles/';
export const API_POST_ARTICLES = '/api/articles.json';
export const API_LOGIN = '/api/login';
export const API_LOGOUT = '/logout';
export const API_REGISTER = '/api/users';

// Nos Appels
export const dataArticles = () => {
    return API_BACKEND.get(API_GET_ARTICLES)
}

export const dataArticlesById = (idArticle) => {
    return API_BACKEND.get(API_GET_ARTICLE_BY_ID + idArticle)
}

export const authenticate = (values) => {
    return API_BACKEND.post(API_LOGIN, values)
}

export const register = (values) => {
    return API_BACKEND.post(API_REGISTER, values)
}

export const addArticle = (article) => {
    return API_BACKEND.post(API_POST_ARTICLES, article, {
        headers: {Authorization: "Bearer " + article.token },
    }).catch(function (error) {
        console.log(error)
    })
}