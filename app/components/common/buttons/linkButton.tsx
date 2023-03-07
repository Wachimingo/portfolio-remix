export const LinkButton = ({ children, link, info, error, success, extendedClass, ...props }: any): any => {
  let type = "success";
  if (success) type = "success";
  if (info) type = "info";
  if (error) type = "error";

  return (
    <a className={`button ${type} ${extendedClass ?? ""}`} href={link} {...props}>
      {children}
    </a>
  );
};

export default LinkButton;
