export const Section = ({ children, row, extendedClassName, ...props }: any) => {
  return (
    <section className={`container-flex ${row ? "container-row" : "container-column"} ${extendedClassName ?? ""}`} {...props}>
      {children}
    </section>
  );
};
