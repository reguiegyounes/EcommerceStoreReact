import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductsList from "./ProductsList";

export default function Catalog(){
    const [products,setProducts]=useState<Product[] >([]);

    const getProducts = async () => {
        var p=await agent.Catalog.list();
        setProducts(p);
    };

    useEffect(()  =>{
       getProducts();
    },[]);

    return (
    
        <ProductsList products={products}/>
      
    );
}