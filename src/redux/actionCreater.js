import * as ActionTypes from './actionsTypes';
import { DISHES } from "../shared/dishes";

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId,
        rating,
        author,
        comment
    }
});

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    // dispatch(addDishes(DISHES))
    setTimeout(() => {
        console.log("23232")
        const s = dispatch(addDishes(DISHES))
        console.log(s);
    }, 2000)
    console.log("1232231233212331231")
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});