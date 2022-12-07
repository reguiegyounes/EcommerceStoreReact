import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from "react";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import BasketSummary from "./BasketSummary";
import { currencyFormat } from "../../app/util/util";
import { Link } from "react-router-dom";


export default function BasketPage() {
   
    const {basket,setBasket,removeItem} = useStoreContext();
    const [status, setStatus] = useState({
        loading: false,
        name : ''
    });

    async function handleAddItem(productId:string ,name : string)  {
        setStatus({
            loading: true ,
            name : name
        });
        try {
            const basket=await agent.BasketApi.addItem(productId);
            setBasket(basket);
        } catch (error) {
            console.log(error);
        } finally {
            setStatus({
                loading: false ,
                name : ''
            });
        }
    }

    async function handleRemoveItem(productId:string, quantity=1,name : string) {
        setStatus({
            loading: true ,
            name : name
        });
        try {
            await agent.BasketApi.removeItem(productId,quantity);
            removeItem(productId,quantity);
        } catch (error) {
            console.log(error);
        } finally {
            setStatus({
                loading: false ,
                name : ''
            });
        }
    }

    if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map((item) => (
                            <TableRow
                                key={item.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  
                            >
                                <TableCell component="th" scope="row">
                                    <Box display='flex' alignItems='center'>
                                        <img src={item.pictureUrl} alt={item.name} style={{height:50 , marginRight:20}}/>
                                        <span>{item.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton 
                                        loading={status && status.name === 'remove' + item.productId} 
                                        onClick={()=> handleRemoveItem(item.productId ,1,'remove' + item.productId)} 
                                        color='error'>
                                        <Remove />
                                    </LoadingButton>
                                    {item.quantity}
                                    <LoadingButton 
                                        loading={status && status.name === 'add' + item.productId} 
                                        onClick={()=> handleAddItem(item.productId,'add'+item.productId)} 
                                        color='secondary'>
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton 
                                        loading={status && status.name === 'delete' + item.productId}  
                                        onClick={()=> handleRemoveItem(item.productId,item.quantity,'delete' + item.productId)} 
                                        color='error'>
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={5}/>
                <Grid item xs={7}>
                    <BasketSummary/>
                    <Button 
                        component={Link}
                        to ='/checkout'
                        variant='contained'
                        size='large'
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>
        
    )
}
