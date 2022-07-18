import axios from "axios";
import { dataArticlesById } from "../../constants/apiConstants";
import { REDUX_GET_ALL_ARTICLES, REDUX_GET_ALL_ARTICLES_ERROR, REDUX_GET_ARTICLE_BY_ID, REDUX_GET_ARTICLE_BY_ID_ERROR } from "../../constants/reduxConstants";

const dataArticles = () => {
    return axios.get('https://localhost:8000/api/articles.json')
}

export const getAllArticles = () => async (dispatch) => {
    try {
        const res = await dataArticles();
        dispatch({
            type: REDUX_GET_ALL_ARTICLES,
            payload: res.data,
        });
    }   catch (e) {
        dispatch({
            type: REDUX_GET_ALL_ARTICLES_ERROR,
            payload: console.log(e),
        });
    }
};

export const getArticleById = (idArticle) => async (dispatch) => {
    try {
        const res = await dataArticlesById(idArticle);
        dispatch({
            type: REDUX_GET_ARTICLE_BY_ID,
            payload: res.data,
        });
    }   catch (e) {
        dispatch({
            type: REDUX_GET_ARTICLE_BY_ID_ERROR,
            payload: console.log(e),
        });
    }
};