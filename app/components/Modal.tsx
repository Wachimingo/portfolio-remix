/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";

export const Modal = ({ children, isOpen, closeModal, wrapperId = 'default' }: any) => {
    useEffect(() => {
        /**
    * If the target of the event is the modal, remove the event listener and close the modal.
    * @param {any} event - any - the event that is passed to the function
    */
        function closeWhenClickOutside(event: Event) {
            if (event.target == document.getElementById(`${wrapperId}-modal`)) {
                window.removeEventListener('click', closeWhenClickOutside);
                closeModal(false);
            }
        }
        window.addEventListener('click', closeWhenClickOutside);
    }, [])

    if (!isOpen) return null;
    return (
        <div className="modal-container" id={`${wrapperId}-modal`} style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-content">
                <span className="modal-close-btn" onClick={() => closeModal(false)}>
                    &times;
                </span>
                {children}
            </div>
        </div>
    )
}