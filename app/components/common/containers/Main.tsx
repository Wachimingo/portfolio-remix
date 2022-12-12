export const Main = ({ children, row, extendedClassName, ...props }: any) => {
  return (
    <main className={`container-flex ${row ? "container-row" : "container-column"} ${extendedClassName ?? ""}`} {...props}>
      {children}
    </main>
  );
};
