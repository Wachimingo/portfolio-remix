import { Link } from "@remix-run/react"
import { FaArrowDown } from "react-icons/fa"

export const SeeMoreLinks = ({ link }: { link: string }) => {
    return <div className=''>
        <div className=''>
            <FaArrowDown />
        </div>
        <Link to={link} style={{}}>
            See More
        </Link>
    </div>
}