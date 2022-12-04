import { Typography } from "@mui/material";
import { useEffect, useState } from "react"
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Basket } from "../../app/models/basket";


export default function BasketPage() {
    const [loading,setLoading] = useState(true);
    const [basket,setBasket] = useState<Basket | null>(null);


    const getbasket = async () => {
        setLoading(true);
        try {
            var basket = await agent.BasketApi.get();
            setBasket(basket);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getbasket();
    },[]);
    

    if (loading) return <LoadingComponent message='Loading Basket...'/>

    if (!basket) return <Typography variant="h3">Your basket is empty</Typography>
    return (
        <h1>{basket.buyerId}</h1>
    )
}
