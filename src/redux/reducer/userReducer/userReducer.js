import ActionType from "../../actionType";
 
const initialState = {
    user: {},
}
 
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.setToken:
            return { ...state, user: action.payload }

        default:
            return state;
    }
}
 
export default userReducer;
