import { List } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
    products:Product[];
}

export default function ProductsList({products}:Props){
    return (
        <List>
            {products.map((product) => (
                <ProductCard product={product}/>
            ))}
        </List>
    )
 }