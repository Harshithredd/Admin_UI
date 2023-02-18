import "./Modal.css";
import CloseIcon from '@mui/icons-material/Close';
export default function Modal({open,close,title,children,handelModalSubmit}) {
    if(!open){
        return null;
    }
    return(
        <>
        <div className="modal" onClick={close}>
            <div className="modal_container" onClick={(e)=> e.stopPropagation()}>
                <div className="modal_header">
                    <h3 className="modal_title">{title}</h3>
                    <CloseIcon onClick={close} className="modal_close"/>
                </div>
                <div className="modal_body">
                    {children}
                </div>
                <div className="modal_footer">
                    <div onClick={handelModalSubmit} className="update_button"> Update User</div>
                    <button onClick={close} className="update_button cancel"> Cancel</button>
                </div>
            </div>
        </div>
        </>
    )
}