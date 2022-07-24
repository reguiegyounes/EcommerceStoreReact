import { Button } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductsList from "./ProductsList";



interface Props{
    products:Product[];
    addProduct:()=>void;
}


export default function Catalog({products,addProduct}:Props){
    return (
        <>
            <Button variant="contained" onClick={addProduct}>Add Product</Button>
            <ProductsList products={products}/>
        </>
    );
}