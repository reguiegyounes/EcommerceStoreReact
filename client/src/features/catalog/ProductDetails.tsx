import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";

export default function ProductDetails(){
    const {id}=useParams<{id: string}>();

    const {basket ,setBasket,removeItem} = useStoreContext();
    const [product,setProduct]=useState<Product | null>(null);
    const [loading, setLoading]=useState(true);
    const [quantity,setQuantity] = useState(0);
    const [submitting ,setSubmitting] =useState(false);

    const item =basket?.items.find(i => i.productId === id) ;


    const getProduct=async ()=>{
        if(item) setQuantity(item.quantity);
        try {
            const result= await agent.Catalog.details(`${id}`);
            setProduct(result);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
        
    }

    function handleInputChange(event: any) {
        if(product){
            if(event.target.value>=0 && event.target.value <= product.quantityInStock){
                setQuantity(parseInt(event.target.value))
            }
        }
    }

    async function handleUpdateCart() {
        setSubmitting(true);
        if(!item || quantity > item.quantity){
            const updateQuantity=item ? quantity - item.quantity : quantity ;
            try {
                const basket=await agent.BasketApi.addItem(id!,updateQuantity);
                setBasket(basket);
            } catch (error) {
                console.log(error);
            } finally {
                setSubmitting(false)
            }
        }else {
            const updateQuantity=item.quantity - quantity ;
            try {
                await agent.BasketApi.removeItem(id!,updateQuantity);
                removeItem(id!,updateQuantity);
            } catch (error) {
                console.log(error);
            } finally {
                setSubmitting(false)
            }
        }
    }

    useEffect(() => {
        getProduct();
    }, [id,item])
    
    if (loading) return <LoadingComponent message='Loading Product...'/>

    if (!product) return <NotFound/>

    return (

        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width:'100%'}}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{mb:2}}/>
                <Typography variant="h4" color='secondary'>${(product.price).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Qauntity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            onChange={handleInputChange}
                            variant='outlined'
                            type='number'
                            label='Quantity in Cart'
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            sx={{height : '55px'}} 
                            color='primary'
                            size='large'
                            variant='contained'
                            fullWidth
                            loading={submitting}
                            disabled={item?.quantity === quantity || (!item && quantity===0)}
                            onClick={handleUpdateCart}
                        >
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    )
}

