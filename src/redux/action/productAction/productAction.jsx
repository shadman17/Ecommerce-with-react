import { productsList } from "../../../utils/api"
import ActionType from "../../actionType"

export const getproductsList = () => {
    return async (dispatch) => {
        const data = await productsList()
        dispatch(setproductsList(data))
    }
}

export const setproductsList = (products) => ({
    type: ActionType.setproductList,
    payload: products
})