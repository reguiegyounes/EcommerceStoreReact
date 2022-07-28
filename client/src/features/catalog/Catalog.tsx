import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import ProductsList from "./ProductsList";

export default function Catalog(){
    const [products,setProducts]=useState<Product[] >([]);

    useEffect(()=>{
        fetch("http://localhost:5678/api/products")
        .then(response => response.json())
        .then(data => setProducts(data))

    },[])

    return (
    
        <ProductsList products={products}/>
      
    );
}