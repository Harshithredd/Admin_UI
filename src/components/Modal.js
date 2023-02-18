import "./Modal.css"
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
                </div>
                <div className="modal_body">
                    {children}
                </div>
                <div className="modal_footer">
                    <button onClick={handelModalSubmit}> Submit</button>
                    <button onClick={close}> Cancel</button>
                </div>
            </div>
        </div>
        </>
    )
}