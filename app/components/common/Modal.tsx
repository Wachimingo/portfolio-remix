export const Modal = ({ children, closeModal, id = 'default', ...props }: any) => {
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