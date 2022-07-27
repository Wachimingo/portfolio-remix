import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Carousel } from "~/components";
import caruselStyle from "~/styles/carousel.css"
import restaurantStyle from "~/styles/restaurant.css"
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
        { rel: "stylesheet", href: caruselStyle, media: "none" },
        { rel: "stylesheet", href: restaurantStyle, media: "none" },
    ]
}

export const loader = async () => {
    const dishes = await getForToday({})
    return json(dishes)
}

const Restaurant = () => {
    const dishes = useLoaderData();
    return (
        <div className="restaurant-landing-page">
            <main>
                <h1>Restaurant</h1>
                <img src='/assets/restaurant/restaurant.webp' alt="logo" />
                <h2>Enjoy!</h2>
                <br />
                <h2>Today's Menu</h2>
                <br />
                <Carousel items={dishes ?? []} />
            </main>
            <section className="offering-section">
                <div>
                    <h4>Breakfast</h4>
                    <img
                        src='https://images.weserv.nl/?url=https://bigoven-res.cloudinary.com/image/upload/h_320,w_320,c_fill/english-breakfast.jpg&w=300&h=300'
                        alt="breakfast"
                        loading="lazy"
                        width="auto"
                        height="auto"
                    />
                </div>
                <div>
                    <h4>Lunch</h4>
                    <img
                        src='https://images.weserv.nl/?url=https://images.freshop.com/2022776539896086690/aeb9b0d3526652a7479aef0a91fa91ae_large.png&type=webp&w=300&h=300'
                        alt="breakfast"
                        loading="lazy"
                        width="auto"
                        height="auto"
                    />
                </div>
                <div>
                    <h4>Dinner</h4>
                    <img
                        src='https://images.weserv.nl/?url=https://bigoven-res.cloudinary.com/image/upload/h_320,w_320,c_fill/cheesy-hash-brown-skillet-dinner.jpg&w=300&h=300'
                        alt="breakfast"
                        loading="lazy"
                        width="auto"
                        height="auto"
                    />
                </div>
            </section>
        </div>
    )
}

export default Restaurant;