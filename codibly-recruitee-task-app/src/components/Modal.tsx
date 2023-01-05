import React from "react";

const Modal  = ({children, isOpen}) => {

    return (
        <div className={`modal ${isOpen ? ' modal--active' : ''}`}>
            <div>
                {children}
            </div>
        </div>
    );
}

export default Modal;