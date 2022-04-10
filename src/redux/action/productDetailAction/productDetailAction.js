import { ProductDetail } from "../../../utils/api"
import ActionType from "../../actionType"

export const getProductDetail = (id) => {
    return async (dispatch) => {
        const data = await ProductDetail(id)
        dispatch(setProductDetail(data))
    }
}


export const setProductDetail = (product) => ({
    type: ActionType.productDetail,
    payload: product
})
