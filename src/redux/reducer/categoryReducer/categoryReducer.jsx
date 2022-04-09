import ActionType from "../../actionType";

const initialState = {
    categories: []
}

const categoryReducer = (state = initialState, action) => {
    switch(action.type){

        case ActionType.setCategories:
            return {...state, categories: action.payload}
    
        default:
            return state;    
    }
}


export default categoryReducer;