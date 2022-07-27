import { Card } from "../Card"
import type { Certification } from "~/types/skillsAndCerts"

export const CertCardList = ({ certs }) => {
    return <>
        {
            certs.map((cert: Certification, i: number) => {
                return (
                    <Card key={i} index={i}>
                        <img
                            loading="lazy"
                            src={cert.icon ? cert.icon : './assets/skills/default.webp'}
                            alt={cert.name}
                        />
                        <h3>{cert.name}</h3>
                        <br />
                    </Card>
                )
            })
        }
    </>
}