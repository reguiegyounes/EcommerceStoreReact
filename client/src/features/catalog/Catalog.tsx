import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductsList from "./ProductsList";

export default function Catalog(){
    const [products,setProducts]=useState<Product[] >([]);
    const [loading, setLoading]=useState(true);

    const getProducts = async () => {
        try {
            var p=await agent.Catalog.list();
            setProducts(p);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
        
    };

    useEffect(()  =>{
       getProducts();
    },[]);

    if (loading) return <LoadingComponent message='Loading Products...'/>

    return (
    
        <ProductsList products={products}/>
      
    );
}