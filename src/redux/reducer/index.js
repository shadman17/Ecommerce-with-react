import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer/categoryReducer";
import productReducer from "./productReducer/productReducer";
import productDetailReducer from "./productDetailReducer/productDetailReducer"
import cartReducer from "./cartReducer/cartReducer";
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import userReducer from "./userReducer/userReducer";

const persistedConfig = {
    key: "userlogin",
    storage,
}

const persistedReducer = persistReducer(persistedConfig, userReducer)

const reducers = combineReducers({
    productsList: productReducer,
    categoriesList: categoryReducer,
    product: productDetailReducer,
    cart: cartReducer,
    userStore: persistedReducer,
})

export default reducers