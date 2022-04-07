import { json, useFetcher, useLoaderData } from "remix";
import { Card } from "~/components/Card";
import { getAllDishes } from "~/controllers/dishes";

export const loader = async () => {
    const dishes = await getAllDishes({});
    return json(dishes)
}

const Dishes = () => {
    const dishes = useLoaderData();
    const fetcher = useFetcher();
    return (
        <div className="d-inline-block">
            <Card
                dishes={dishes ?? []}
                fetcher={fetcher}
            // setDishToModify={setDishToModify}
            />
        </div>
    )
}

export default Dishes;