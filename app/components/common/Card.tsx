import type { ReactChild } from "react";

type Props = {
    children?: ReactChild | ReactChild[],
    props?: {}
}

export const Card = ({ children, ...props }: Props) => {
    return (
        <div className="card-wrapper" {...props}>
            <div className="card-container">
                {children}
            </div>
        </div>
    )
}