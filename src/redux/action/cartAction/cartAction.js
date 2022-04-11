import ActionType from "../../actionType"

export const addItem = (product) => ({
    type: ActionType.addItem,
    payload: product

})

export const delItem = (product) => ({
    type: ActionType.delItem,
    payload: product
})