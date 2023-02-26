import { useEffect, useState } from "react"
import axios from "axios"
import "./UserTable.css"
import { config } from "../App";
import Modal from "./Modal";
import UserForm from "./UserForm";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredUserData, getUserData, updateselectedUserId } from "../actions";
import PaginationController from "./PaginationController";
import UserRow from "./UserRow";

const tableHeadings = ["Name","Email","Role","Actions"]
export default function UserTable(){

    const dispatch = useDispatch();
    const [openModal,setOpenModal] = useState(false);
    const [checkboxArray,setCheckboxArray] = useState([]);
    const [checkAll,setCheckAll] =useState(false);
    const [pageNumber,setPageNumber]= useState(1);
    const [itemsPerPage,setItemsPerPage] = useState(10);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [ArrayToDisplay,setArrayToDisplay] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [noUserFound,setNoUserFound] = useState(false)
    const usersState = useSelector((state)=>{
        return state.userReducer
        }
    );
    const userData = usersState.allUsers;
    const selectedUser = usersState.selectedUser;
    const filteredUsers = usersState.filteredUsers;
    
    const updateItemsInPageinationTable = ()=>{
        const lastPageNumber = itemsPerPage * pageNumber;
        const firstPageNumber = lastPageNumber - itemsPerPage;
        const updatedItemsToDisplay = filteredUsers.slice(firstPageNumber,lastPageNumber);
       // console.log(firstPageNumber,lastPageNumber,updatedItemsToDisplay);
        const pageNumbers=[];
        for(let i=1;i<=Math.ceil(filteredUsers.length/itemsPerPage);i++){
            pageNumbers.push(i);
        }
        if(updatedItemsToDisplay.length === 0) setPageNumber(1);
        setCheckboxArray(new Array(updatedItemsToDisplay.length).fill(false));
        setArrayToDisplay(updatedItemsToDisplay);
        setNumberOfPages(pageNumbers);
    }
    
    const getUsers=async ()=>{
        try{
            setIsLoading(true);
            setNoUserFound(false);
            const res = await axios.get(`${config.endpoint}adminui-problem/members.json`);
            console.log(res);
           
            dispatch(getUserData(res.data));
            dispatch(getFilteredUserData(res.data));     
            setIsLoading(false)     
        }catch(e){
            setIsLoading(false)
            setNoUserFound(true)
            console.log(e);           
        }

    }
    const handleUserDelete=(e)=>{
        const id= e.currentTarget.id;
        let filteredUserData = filteredUsers.filter((user)=>{
            return user.id !== id
        })
        dispatch(getFilteredUserData(filteredUserData));
        setCheckAll(false)
    }

    const handleUserEdit=(e)=>{
       setOpenModal(true);
        dispatch(updateselectedUserId(e.currentTarget.id))
    }
    const handelCheckboxChange= (e)=>{        
        let checkedIndex = e.target.id;
        let updatedCheckboxArray = checkboxArray.map((val,index)=>{
            return index==checkedIndex ? !val : val
        })
        setCheckboxArray(updatedCheckboxArray);
    }
    const HandelDeleteSelected =()=>{
        let filteredUserData = filteredUsers.filter((user,index)=>{
            return !checkboxArray[index]
        })
        dispatch(getFilteredUserData(filteredUserData));
        setCheckAll(false);
    }
    const handelModalSubmit =()=>{
        const Updatedusers = filteredUsers.map((user,index)=>{
            if(user.id == selectedUser.id){
                return {
                    id  : selectedUser.id,
                    name  :selectedUser.name,
                    email  : selectedUser.email ,         
                    role  :selectedUser.role,
                }
            }else{
                return user
            }
        })
        dispatch(getFilteredUserData(Updatedusers));
        setOpenModal(false);
    }

    useEffect(()=>{
        getUsers()
    },[])
    useEffect(()=>{
        setArrayToDisplay(filteredUsers);
        updateItemsInPageinationTable();
    },[filteredUsers])
    useEffect(()=>{
        let selectAll = checkboxArray.map(()=> checkAll)
        setCheckboxArray(selectAll);
    },[checkAll])
    useEffect(()=>{
        updateItemsInPageinationTable();
        setCheckAll(false);
    },[pageNumber])
 
    return(
        <div className="table_container">
            <table className="user_table">
                <thead className="user_table_head">
                    <tr className="row">
                        <td  className="column">
                            <input  data-testid="check_all"
                                    type="checkbox" 
                                    checked={checkAll}
                                    onChange={()=> setCheckAll(!checkAll)}>
                        </input></td>
                        {
                            tableHeadings && tableHeadings.map(heading => <td className="column">{heading}</td>)
                        }
                    </tr>
                </thead>
                <tbody className="user_table_body">
                    {
                        isLoading && <h4 data-testid="loading">LOADING...........</h4>
                    }
                    { noUserFound ? ( <h5>NO USER FOUND</h5> )
                     :
                       ( ArrayToDisplay && ArrayToDisplay.map((user,index)=>{
                            return (
                                <UserRow   index={index} handelCheckboxChange={handelCheckboxChange} 
                                handleUserEdit={handleUserEdit} handleUserDelete={handleUserDelete} 
                                checkboxArray={checkboxArray} user={user} />
                            )
                            })
                       )
                    } 
                </tbody>
            </table>
            <PaginationController   setPageNumber={setPageNumber}  
                    numberOfPages={numberOfPages} 
                    pageNumber={pageNumber} 
                    HandelDeleteSelected={HandelDeleteSelected}/>
            
            <Modal  close={()=> setOpenModal(false)} 
                    open={openModal} 
                    title={"Edit User"} 
                    handelModalSubmit={handelModalSubmit}>
                <UserForm />
            </Modal>
        </div>
    )


    
    }