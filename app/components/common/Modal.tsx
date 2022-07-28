/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";

export const Modal = ({ children, closeModal, id = 'default', ...props }: any) => {
    useEffect(() => {
        /**
    * If the target of the event is the modal, remove the event listener and close the modal.
    * @param {any} event - any - the event that is passed to the function
    */
        function closeWhenClickOutside(event: Event) {
            if (event.target == document.getElementById(`${id}-modal`)) {
                window.removeEventListener('click', closeWhenClickOutside);
                closeModal(false);
            }
        }
        window.addEventListener('click', closeWhenClickOutside);
    }, [])

    return (
        <div className="modal-container none" id={`${id}-modal`}>
            <div className="modal-content">
                <span className="modal-close-btn">
                    &times;
                </span>
                {children}
            </div>
        </div>
    )
}