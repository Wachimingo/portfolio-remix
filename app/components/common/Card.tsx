export const Card = ({ children, ...props }) => {
    return (
        <div className="card-wrapper" {...props}>
            <div className="card-container">
                {children}
            </div>
        </div>
    )
}