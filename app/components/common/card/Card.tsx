export const Card = ({ children, extendedClassName, ...props }: any) => {
  return (
    <div className={`card ${extendedClassName ?? ""}`} {...props}>
      <div className='card-container'>{children}</div>
    </div>
  );
};

export default Card;
