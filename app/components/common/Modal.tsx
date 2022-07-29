import type { ReactChild } from 'react';

type Props = {
    children?: ReactChild | ReactChild[],
    id?: string,
    props?: {}
}

export const Modal = ({ children, id = 'default', ...props }: Props) => {
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