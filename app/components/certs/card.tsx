/* eslint-disable react/display-name */
import type { ReactChild } from "react";
import { FaCog, FaTrash } from "react-icons/fa";
import { Card } from "~/components";
import type { Certification } from "~/types/skillsAndCerts"

type Props = {
    children?: ReactChild | ReactChild[],
    cert: Certification,
}



export const CertCard = ({ children, cert }: Props) => {
    return <Card key={cert.name}>
        <img
            loading="lazy"
            src={cert.icon ? cert.icon : '/assets/skills/default.webp'}
            alt={cert.name}
            width='150px'
            height='150px'
        />
        <div>
            <h3>{cert.name}</h3>
        </div>
        <>
            {children}
        </>
    </Card>
}

export const AdminCertCard = ({ cert }: Props) => {
    return <CertCard cert={cert}>
        <FaCog
            id={`${cert.name}_modify_btn`}
            className='card-modify-btn'
            data-cert-id={cert._id}
            data-cert-name={cert.name}
            data-cert-description={cert.description}
            data-cert-icon={cert.icon}
        >
            Modify
        </FaCog>
        <FaTrash
            id={`${cert.name}_remove_btn`}
            className='card-remove-btn'
            data-cert-id={cert._id}
        >
            Remove
        </FaTrash>
    </CertCard>
}

export default CertCard;