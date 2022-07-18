import { REDUX_GET_ALL_ARTICLES, REDUX_GET_ARTICLE_BY_ID } from "../../constants/reduxConstants";

const initialState = {articles: [], article: {}};

export const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case REDUX_GET_ALL_ARTICLES:
            return {
                ...state,
                articles: action.payload,
            };
            case REDUX_GET_ARTICLE_BY_ID:
            return {
                ...state,
                article: action.payload,
            }
        default:
            return state;
    }
};