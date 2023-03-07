export const Div = ({ children, row, extendedClassName, ...props }: any) => {
  return (
    <div className={`container-flex ${row ? "container-row" : "container-column"} ${extendedClassName ?? ""}`} {...props}>
      {children}
    </div>
  );
};

export default Div;
