export const LinkButton = ({ children, link, info, error, success, extendedClass, ...props }: any): any => {
  if (success) {
    return (
      <a className={`button success ${extendedClass ?? ""}`} href={link} {...props}>
        {children}
      </a>
    );
  }
  if (info) {
    return (
      <a className={`button info ${extendedClass ?? ""}`} href={link} {...props}>
        {children}
      </a>
    );
  }
  if (error) {
    return (
      <a className={`button error ${extendedClass ?? ""}`} href={link} {...props}>
        {children}
      </a>
    );
  }
  return (
    <a className='button' href={link}>
      {children}
    </a>
  );
};
