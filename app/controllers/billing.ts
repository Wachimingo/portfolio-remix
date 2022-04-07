export const increaseCount = (
    i: number,
    dish: any,
    dishCounter: number,
    dishCounters: number[],
    setDishCounters: Function,
    totalDishes: number,
    setTotalDishes: Function,
    selectedDishes: any,
    setSelectedDishes: Function,
    totalPrice: number,
    setTotalPrice: Function
) => {
    if (dishCounter < 1) {
        let dishes = [...selectedDishes]
        delete dish!.category
        delete dish!.createdAt
        delete dish!.description
        delete dish!.forToday
        delete dish!.favoriteQuantity
        delete dish!.ratingsAverage
        delete dish!.ratingsQuantity
        delete dish!.image
        delete dish!.__v
        delete dish!._id
        dishes.push(dish)
        setSelectedDishes(dishes)
    }
    dishCounter++;
    let newdishCounters = [...dishCounters];
    newdishCounters[i] = dishCounter;
    setDishCounters(newdishCounters);
    totalDishes++;
    setTotalDishes(totalDishes);
    totalPrice = totalPrice + dish!.price;
    setTotalPrice(totalPrice);
}

export const decreaseCount = (
    i: number,
    dish: any,
    dishCounter: number,
    dishCounters: number[],
    setDishCounter: Function,
    totalDishes: number,
    setTotalDishes: Function,
    selectedDishes: any,
    setSelectedDishes: Function,
    totalPrice: number,
    setTotalPrice: Function
) => {
    if (dishCounter > 0) {
        dishCounter--;
        let newArray = [...dishCounters];
        newArray[i] = dishCounter;
        setDishCounter(newArray);
        totalDishes--;
        setTotalDishes(totalDishes);
        totalPrice = totalPrice - dish!.price;
        setTotalPrice(totalPrice);
    }
    if (dishCounter < 1) {
        let dishes = [...selectedDishes]
        const newDishes: any = dishes.filter((item: any) => {
            if (item.name === dish!.name) {
                return undefined
            } else {
                return item
            }
        })
        setSelectedDishes(newDishes)
    }
}

export const processTransaction = async (
    totalPrice: number,
    totalDishes: number,
    token: string,
    userId: string,
    selectedDishes: any,
    dishCounters: number[],
    items: any,
    customer?: string,
) => {
    let dishes = [...selectedDishes]
    dishes.forEach((dish: any) => {
        const index = items.indexOf(dish)
        if (index > -1) {
            dish.quantity = dishCounters[index]
            delete dish!.image
        }
    });

    // const result = await fetch('/api/comedor/bills', {
    //     method: 'POST',
    //     headers: {
    //         'content-type': 'application/json',
    //         Authorization: `Bearer ${token}`
    //     },
    //     body: JSON.stringify({
    //         userId,
    //         customer: customer ?? userId,
    //         totalDishes,
    //         totalPrice,
    //         status: 'isPending',
    //         isPaid: false,
    //         body: [...dishes]
    //     })
    // });
    // const data = await result.json();
    // if (result.ok) {
    //     toast.success('Transaccion realizada');
    // } else {
    //     toast.error(data.error)
    // }
}

export const clearSellValues = (
    setDishCounter: Function,
    setTotalDishes: Function,
    setSelectedDishes: Function,
    setTotalPrice: Function
) => {
    setDishCounter([]);
    setTotalDishes(0);
    setSelectedDishes([]);
    setTotalPrice(0);
}