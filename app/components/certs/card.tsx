/* eslint-disable react/display-name */
import { FaCog, FaTrash } from "react-icons/fa";
import { Card } from "~/components";
import type { Certification } from "~/types/skillsAndCerts"

type Props = {
    certs: Certification[],
    admin?: Boolean
}

export default ({ certs, admin }: Props) => {
    const controls = (cert: Certification) => {
        if (!admin) return undefined;
        return (
            <>
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
            </>
        )
    }
    return <>
        {
            certs.map((cert: Certification, i: number) => {
                return (
                    <Card key={i} index={i}>
                        <img
                            loading="lazy"
                            src={cert.icon ? cert.icon : '/assets/skills/default.webp'}
                            alt={cert.name}
                            width='auto'
                            height='auto'
                        />
                        <h3>{cert.name}</h3>
                        {controls(cert)}
                    </Card>
                )
            })
        }
    </>
}