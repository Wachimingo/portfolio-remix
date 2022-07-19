const Carousel = ({ items }: any) => {
    return (
        <div className='slider'>
            <br />
            {
                items.map((item: any, i: number) => {
                    return (
                        <span key={`slideButton${i}`}>
                            <a className="slider-tags" href={`#slide-${i}`}>{i + 1}</a>
                        </span>
                    )
                })
            }
            <br />
            <br />
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
    )
}

export default Carousel;