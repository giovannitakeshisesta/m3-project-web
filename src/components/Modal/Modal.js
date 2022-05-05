import React, {useEffect} from "react";
import ReactDOM from 'react-dom'
import '../../styles/Modal.scss'


const ModalContent = (props) => {

    return (
        <div className="dialog_my" role="dialog" >
            <div className="modal-dialog modal-dialog_my" role="document">
                <div className="modal-content">
                <div className="modal-header ">
                    <h5 className="modal-title">{props.title}</h5>
                    {/* <button type="button" onClick={props.onClose}  className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button> */}
                    <i className="fa-solid fa-circle-xmark" onClick={props.onClose} ></i>
                </div>

                <div className="modal-body">
                    {props.body}
                </div>

                {/* <div className="modal-footer">
                    <button type="button" className="btn btn-primary">Save changes</button>
                    <button onClick={props.onClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div> */}
                </div>
            </div>
        </div>
    )
}

const Modal = (props) => {

    useEffect(()=> {
        document.body.style.overflow = "hidden";
        return ()=> document.body.style.overflow = "unset"
    }, [])

    // The first argument (child) is any renderable React child, such as an element, string, or fragment. 
    // The second argument (container) is a DOM element.
    return props.reactPortal
    ? ReactDOM.createPortal(<ModalContent {...props}/>, document.getElementById("App") )
    : <ModalContent {...props}/>
}



export default Modal


