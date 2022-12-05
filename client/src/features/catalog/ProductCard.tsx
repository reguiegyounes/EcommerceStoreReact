import { ListItem, ListItemAvatar, Avatar, ListItemText, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material"
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import LoadingButton from '@mui/lab/LoadingButton';
import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";
interface Props{
    product: Product;
}

export default function ProductCard({product}:Props){
    const [loading, setLoading]=useState(false);
    const {setBasket} = useStoreContext();
    const handleAddItem = async (productId:string) => {
        setLoading(true);
        try {
            const basket=await agent.BasketApi.addItem(productId);
            setBasket(basket);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
        
    }
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor:'secondary.main'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx : {fontWeight:'bold',color:'primary.main'}
                }}
            />
            <CardMedia
                sx={{height:140 , backgroundSize:'contain',bgcolor:'primary.light'}}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color='secondary' variant="h5">
                    {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary"> 
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton size="small"
                    loading = {loading}
                    onClick = {() => handleAddItem(product.id)}
                >Add to cart</LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}