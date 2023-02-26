import { GET_FILTERED_USER_DATA, GET_USER_DATA, POPULATE_SELECTED_USER_IN_FORM, UPDATE_SELECTED_USER, UPDATE_SELECTED_USERID } from "../constants/action-types"

export const  getUserData = (userdata)=>{
    return {
        type : GET_USER_DATA,
        payload : userdata
    }
}

export const  getFilteredUserData = (userdata)=>{
    return {
        type : GET_FILTERED_USER_DATA,
        payload : userdata
    }
}

export const  updateselectedUserId = (userId)=>{
    return {
        type : UPDATE_SELECTED_USERID,
        payload : userId
    }
}
export const  updateselectedUser = ({name,value})=>{
    return {
        type : UPDATE_SELECTED_USER,
        payload : {name,value}
    }
}

export const  populateSelectedUserInForm = (user)=>{
    return {
        type : POPULATE_SELECTED_USER_IN_FORM,
        payload : user
    }
}



