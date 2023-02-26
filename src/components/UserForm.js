import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { populateSelectedUserInForm, updateselectedUser } from "../actions";
import "./UserForm.css"
export default function UserForm(){
    const dispatch =useDispatch();
    const usersState = useSelector((state)=>{
        return state.userReducer
        }
    );
    const userData = usersState.allUsers;
    const selectedUserId = usersState.selectedUserId;
    const formData = usersState.selectedUser;

    const handleFormData =(e)=>{
        dispatch(updateselectedUser({name : e.target.name ,value :e.target.value}));
    }

    const updateSelectedUserInForm = ()=>{
        let userFound = userData.find((user)=>{
            return user.id == selectedUserId
        })
        dispatch(populateSelectedUserInForm(userFound));
    }
    useEffect(()=>{
        updateSelectedUserInForm();
        return ()=>{
          //  dispatch(populateSelectedUserInForm({}))
        }
    },[])
    return(
        <>
                <form className="form">
                        <input  className="form_input" 
                                name="name" 
                                placeholder="Enter Name"
                                value={formData.name} 
                                onChange={handleFormData} />

                        <input  className="form_input"
                                name="email" 
                                placeholder="Enter Email" 
                                value={formData.email} 
                                onChange={handleFormData} />

                        <input  className="form_input" 
                                name="role" placeholder="Enter Role" 
                                value={formData.role} 
                                onChange={handleFormData} />
                </form>
        </>
    )
}