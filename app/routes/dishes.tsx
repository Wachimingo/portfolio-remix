import { json, useLoaderData } from "remix";

export const loader = async () => {
    const res = await fetch(`${process.env.managementBackend}/dishes?select=' name '`)
    const dishes = await res.json();
    return json(dishes);
};

export default function Posts() {
    const dishes = useLoaderData<any>();
    return (
        <main>
            <h1>Dishes</h1>
            <ul>
                {dishes.map((dish: any) => (
                    <p key={dish._id}>{dish.name}</p>
                ))}
            </ul>
        </main>
    );
}
