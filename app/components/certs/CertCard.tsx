import { Card } from "../common/card/index";
export const CertCard = ({ cert, children, extendedClassName }: any) => {
  return (
    <Card key={cert.name} extendedClassName={extendedClassName ?? ""}>
      <img className='cert-card-image' src={cert.icon ? cert.icon : "/assets/skills/default.webp"} alt={cert.name} width='auto' height='auto' />
      <h3 className='cert-card-title notranslate'>{cert.name}</h3>
      {children}
    </Card>
  );
};

export default CertCard;
