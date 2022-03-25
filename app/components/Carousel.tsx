import carousel from '~/styles/carousel.css'

export function links() {
    return [
        { rel: "stylesheet", href: carousel },
    ]
}


const Carousel = ({ items }: any) => {
    return (
        <div className="d-inline-block">
            <div className='slider'>
                {
                    items.map((item: any, i: number) => {
                        return (
                            <a key={`slideButton${i}`} href={`#slide-${i}`}>{i + 1}</a>
                        )
                    })
                }
                <div className='slides'>
                    {
                        items.map((item: any, i: number) => {
                            return (
                                <div key={`slide${i}`} id={`slide-${i}`}>
                                    <img className='img' src={item.image} alt={item.name} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Carousel;