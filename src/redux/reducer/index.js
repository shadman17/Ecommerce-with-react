import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer/categoryReducer";
import productReducer from "./productReducer/productReducer";

const reducers = combineReducers({
    productsList: productReducer,
    categoriesList: categoryReducer
})

export default reducers