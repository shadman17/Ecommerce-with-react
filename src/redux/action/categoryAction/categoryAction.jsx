import ActionType from "../../actionType"

import { categoriesList } from "../../../utils/api"

export const getCategoriesList = () => {
    return async (dispatch) => {
        const data = await categoriesList()
        dispatch(setCategoriesList(data))
    }
}

export const setCategoriesList = (category) => ({
    type: ActionType.setCategories,
    payload: category
})