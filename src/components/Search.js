import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getFilteredUserData, getUserData } from "../actions";
import "./Search.css"

export default function Search(){
    const dispatch = useDispatch();
    const [searchValue,setSearchValue] = useState("");
    const usersState = useSelector((state)=>{
        return state.userReducer
        }
    );
    const userData = usersState.allUsers;
    const filteredUsers = usersState.filteredUsers;
    const updateUserDataBasedOnSearch = ()=>{
        if(searchValue === ""){
            dispatch(getFilteredUserData(userData))
            return;
        } 
        const FilteredUserData  = userData.filter((user,index)=>{
            return (
                user.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
            ||  user.email.toLowerCase().includes(searchValue.toLocaleLowerCase())
            ||  user.role.toLowerCase().includes(searchValue.toLocaleLowerCase())
            )
        })
        dispatch(getFilteredUserData(FilteredUserData))
    }
    useEffect(()=>{
        updateUserDataBasedOnSearch()
    },[searchValue]) 
    return(
        <>
            <input  className="searchBox"
                    type="text" 
                    placeholder="Search by name email or role" 
                    value={searchValue}
                    onChange={(e)=> setSearchValue(e.target.value)}
            />
        </>
    )
}