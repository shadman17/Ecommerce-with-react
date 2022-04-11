import ActionType from "../../actionType";

const cartItem = [];

const cartReducer = (state = cartItem, action) => {
    switch (action.type) {
        case ActionType.addItem:
            const exist = state.find((x) => x._id === action.payload._id);
            if (exist) return state;
            else {
                return [...state, action.payload];
            }

        case ActionType.delItem:
            return (state = state.filter((x) => x._id !== action.payload._id));

        default:
            return state;
    }
};

export default cartReducer;
