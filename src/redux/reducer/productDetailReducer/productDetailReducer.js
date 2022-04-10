import ActionType from "../../actionType";

const initialState = {
    product : {}
}

const productDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.productDetail:
            return {...state, product: action.payload}
    
        default:
            return state;
    }
}

export default productDetailReducer