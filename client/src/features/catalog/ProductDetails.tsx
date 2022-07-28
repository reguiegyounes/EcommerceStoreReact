import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";

export default function ProductDetails(){
    const {id}=useParams<{id: string}>();

    const [product,setProduct]=useState<Product | null>(null);
    const [loading, setLoading]=useState(true);

    const getProduct=async ()=>{
        try {
            const result=await axios.get<Product | null>(`http://localhost:5678/api/products/${id}`);
            setProduct(result.data);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
        
    }
    useEffect(() => {
        getProduct();
    }, [id])
    
    if (loading) return <h3>Loading</h3>

    if (!product) return <h3>Product not found</h3>

    return (

        <Typography variant='h2'>
            {product.name}
        </Typography>

    )
}

