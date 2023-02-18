import { GET_FILTERED_USER_DATA, GET_USER_DATA, POPULATE_SELECTED_USER_IN_FORM, UPDATE_SELECTED_USER, UPDATE_SELECTED_USERID } from "../constants/action-types";

const initialState ={
    allUsers :[],
    selectedUser : {},
    selectedUserId : "",
    filteredUsers :[],
 }
export const userReducer = (state = initialState,action)=>{
        switch(action.type){
             case GET_USER_DATA : return {
                ...state, allUsers : action.payload
            };
            case GET_FILTERED_USER_DATA : return {
                ...state, filteredUsers : action.payload
            }
            case UPDATE_SELECTED_USERID : return {
                ...state, selectedUserId: action.payload
            }
            case UPDATE_SELECTED_USER : return{
                ...state, selectedUser : {...state.selectedUser, [action.payload.name] : action.payload.value}
            }
            case POPULATE_SELECTED_USER_IN_FORM : return{
                ...state, selectedUser : action.payload
            }
             default : return state;
        }
 }
