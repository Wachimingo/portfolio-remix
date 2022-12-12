import { Link } from "@remix-run/react";
export const LinkButton = ({ children, link, info, error, success, extendedClass, ...props }: any): any => {
  if (success) {
    return (
      <Link className={`button success ${extendedClass ?? ""}`} to={link} {...props}>
        {children}
      </Link>
    );
  }
  if (info) {
    return (
      <Link className={`button info ${extendedClass ?? ""}`} to={link} {...props}>
        {children}
      </Link>
    );
  }
  if (error) {
    return (
      <Link className={`button error ${extendedClass ?? ""}`} to={link} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <Link className='button' to={link}>
      {children}
    </Link>
  );
};
