import ActionType from "../../actionType"

export const userLogin = (userInfo) => ({
    type: ActionType.setToken,
    payload: userInfo
})

