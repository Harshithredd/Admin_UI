import {combineReducers} from "redux"
import {userReducer} from "./userReducer"
// import {paginationReducer} from "./paginationReducer"
const rootReducer = combineReducers({
    userReducer,
});
export default rootReducer;