import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from "react";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";


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
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">SubTotal</TableCell>
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
                            <TableCell align="right">{item.price.toFixed(2)}</TableCell>
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
                            <TableCell align="right">{(item.price * item.quantity).toFixed(2)}</TableCell>
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
    )
}
