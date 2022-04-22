import { json, useLoaderData } from "remix";
import Carousel from "~/components/Carousel";
import caruselStyle from "~/styles/carousel.css"
import { getForToday } from "~/controllers/dishes";

export const meta = () => {
    return {
        title: "Restaurant",
        description:
            "Welcome to the restaurant app",
    };
};

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
                    background: url(https://images.weserv.nl/?url=https://diplomartbrussels.com/wp-content/uploads/2020/09/food-background-images-94-images-in-co-381169-png-images-pngio-food-background-png-1440_619.png?ssl=1);
                    background-repeat: no-repeat;
                    background-size: 100%;
                    background-color: #fcf8f5;
                }
                `}
            </style>
            <section className="">
                <div className="">
                    <h1 className="">Restaurant</h1>
                </div>
                <img src='https://images.weserv.nl/?url=https://account.globaldatabase.com/logo/www.uwink.com/' alt="logo" />
                <h2>Enjoy!</h2>
                <br />
                <p>Today's Menu</p>
                <Carousel items={dishes ?? []} />
            </section>
            <section className="mb-5 mt-5">
                <div className="d-inline-block">
                    <h4>Breakfast</h4>
                    <img
                        src='https://images.weserv.nl/?url=https://bigoven-res.cloudinary.com/image/upload/h_320,w_320,c_fill/english-breakfast.jpg&w=300&h=300'
                        alt="breakfast"
                    />
                </div>
                <div className="d-inline-block block ms-2">
                    <h4>Lunch</h4>
                    <img
                        src='https://images.weserv.nl/?url=https://images.freshop.com/2022776539896086690/aeb9b0d3526652a7479aef0a91fa91ae_large.png&type=webp&w=300&h=300'
                        alt="breakfast"
                    />
                </div>
                <div className="d-inline-block ms-2">
                    <h4>Dinner</h4>
                    <img
                        src='https://images.weserv.nl/?url=https://bigoven-res.cloudinary.com/image/upload/h_320,w_320,c_fill/cheesy-hash-brown-skillet-dinner.jpg&w=300&h=300'
                        alt="breakfast"
                    />
                </div>
            </section>
        </>
    )
}

export default Restaurant;