import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useSelector } from 'react-redux';
import "./PaginationController.css"
import { ITEMS_PER_PAGE } from '../constants/action-types';

export default function PaginationController({setPageNumber,numberOfPages,pageNumber,HandelDeleteSelected}) {
    
    const usersState = useSelector((state)=>{
        return state.userReducer
        }
    );
    const filteredUsers = usersState.filteredUsers;
    const handelPageNext=()=>{
        console.log(pageNumber,Math.ceil(filteredUsers.length/ITEMS_PER_PAGE))
        if(pageNumber <Math.ceil(filteredUsers.length/ITEMS_PER_PAGE)){
            setPageNumber((prevPageNumber)=>prevPageNumber+1)
        }
    }
    const handelPagePrevious=()=>{
        console.log(pageNumber)
        if(pageNumber >1){
            setPageNumber((prevPageNumber)=>prevPageNumber-1)
        }
    }
    
    return (
        <div className="navigation_coontainer">
                <div className="delete_button_container">
                    <button className="button_delete" 
                            onClick={HandelDeleteSelected}
                            data-testid="delete_all">
                        Delete Selected
                    </button>
                </div>
                <div className="nav_arrows_container"> 
                    <div  className="nav_arrows button" data-testid="firstPage_button" onClick={() => setPageNumber(1)}>
                                <FirstPageIcon fontSize="medium" />
                    </div>
                    <div className="nav_arrows button" data-testid="previousPage_button" onClick={handelPagePrevious}>
                        <ArrowBackIosNewIcon fontSize="small" />
                    </div>
                    <div className="page_numbers_container">
                        {numberOfPages && numberOfPages.map((pageNo, index) => {
                            return(
                                <span   key={index} 
                                        data-testid={`pageNumber_${pageNo}`}
                                        className={pageNo === pageNumber ? "page_numbers active" : "page_numbers"} 
                                        onClick={() => setPageNumber(pageNo)}>
                                        {pageNo}
                                </span>); 
                        })}
                    </div>
                    <div className="nav_arrows button" data-testid="nextPage_button" 
                         onClick={handelPageNext}>
                        <ArrowForwardIosIcon fontSize="small" />
                    </div>
                    <div className="nav_arrows button"  data-testid="LastPage_button"
                        onClick={() => setPageNumber(numberOfPages.length)}>
                        <LastPageIcon fontSize="medium" />
                    </div>
              </div>
        </div>
    );
  }