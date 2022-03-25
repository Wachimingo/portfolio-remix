import { json, useLoaderData } from "remix";
import Carousel from "~/components/Carousel";
import { getForToday } from "~/controllers/dishes";

export const loader = async () => {
    const dishes = await getForToday({})
    return json(dishes)
}

const Restaurant = () => {
    const dishes = useLoaderData();
    return (
        <>
            <section className={`text-center`}>
                <div className="text-black text-xl text-bold right-50">
                    <h1 className="text-2xl">Restaurant</h1>
                </div>
                <br />
                <img src={`/logo.jpg`} alt="logo" width="250" height="250" />
                <br />
                <h2>Enjoy!</h2>
                <br />
                <p>Today's Menu</p>
                <Carousel items={dishes ?? []} />
                {/* <Link href="/menu/sell" passHref>
          <a className="btn btn-success" style={{ width: "25vw" }}>Comprar</a>
        </Link> */}

            </section>
            <section>
                <div className="inline-block">
                    <h4>Breakfast</h4>
                    <img
                        src='https://bigoven-res.cloudinary.com/image/upload/h_320,w_320,c_fill/english-breakfast.jpg'
                        alt="breakfast"
                        width="300"
                        height="300"
                    />
                </div>
                <div className="inline-block xl:ml-24">
                    <h4>Lunch</h4>
                    <img
                        src='https://ipcdn.freshop.com/resize?url=https://images.freshop.com/2022776539896086690/aeb9b0d3526652a7479aef0a91fa91ae_large.png&width=256&type=webp&quality=80'
                        alt="breakfast"
                        width="300"
                        height="300"
                    />
                </div>
                <div className="inline-block xl:ml-24">
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