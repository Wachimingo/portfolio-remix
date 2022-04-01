import { json, useLoaderData } from "remix";
import Carousel from "~/components/Carousel";
import caruselStyle from "~/styles/carousel.css"
import { getForToday } from "~/controllers/dishes";
export function links() {
    return [
        { rel: "stylesheet", href: caruselStyle },
    ]
}

export const loader = async () => {
    const dishes = await getForToday({})
    return json(dishes)
}

const Restaurant = () => {
    const dishes = useLoaderData();
    return (
        <>
            <style >{`
                body {
                    background: url("https://i2.wp.com/diplomartbrussels.com/wp-content/uploads/2020/09/food-background-images-94-images-in-co-381169-png-images-pngio-food-background-png-1440_619.png?ssl=1");
                    background-repeat: no-repeat;
                    background-size: 100%;
                    background-color: #fcf8f5;
                }
                `}
            </style>
            <section className="">
                <div className="">
                    <h1 className="text-2xl">Restaurant</h1>
                </div>
                <img src='https://api.globaldatabase.com/logo/www.uwink.com/' alt="logo" width="250" height="250" />
                <h2>Enjoy!</h2>
                <br />
                <p>Today's Menu</p>
                <Carousel items={dishes ?? []} />
            </section>
            <section className="mb-5 mt-5">
                <div className="d-inline-block">
                    <h4>Breakfast</h4>
                    <img
                        src='https://bigoven-res.cloudinary.com/image/upload/h_320,w_320,c_fill/english-breakfast.jpg'
                        alt="breakfast"
                        width="300"
                        height="300"
                    />
                </div>
                <div className="d-inline-block block ms-2">
                    <h4>Lunch</h4>
                    <img
                        src='https://ipcdn.freshop.com/resize?url=https://images.freshop.com/2022776539896086690/aeb9b0d3526652a7479aef0a91fa91ae_large.png&width=256&type=webp&quality=80'
                        alt="breakfast"
                        width="300"
                        height="300"
                    />
                </div>
                <div className="d-inline-block ms-2">
                    <h4>Dinner</h4>
                    <img
                        src='https://bigoven-res.cloudinary.com/image/upload/h_320,w_320,c_fill/cheesy-hash-brown-skillet-dinner.jpg'
                        alt="breakfast"
                        width="300"
                        height="300"
                    />
                </div>
            </section>
        </>
    )
}

export default Restaurant;