import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material"
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import LoadingButton from '@mui/lab/LoadingButton';
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, setBasket } from "../basket/basketSlice";
import { useSelector } from "react-redux";
interface Props{
    product: Product;
}

export default function ProductCard({product}:Props){
    const dispatch = useAppDispatch();
    const {status} = useAppSelector(state => state.basket);

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
                    loading = {status.includes('pendingAddItem' + product.id)}
                    onClick = {() => dispatch(addBasketItemAsync({productId: product.id}))}
                >Add to cart</LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}