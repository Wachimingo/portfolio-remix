const Modal = (props: any) => {
    return (
        <div className="modal fade" id={props.modalId} tabIndex={-1} aria-labelledby="ModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="CatalogModalLabel">{props.title} </h5>
                        <button id={`${props.modalId}Close`} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props.body}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;