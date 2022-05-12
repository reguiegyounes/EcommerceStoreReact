import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../app/models/product";



interface Props{
    products:Product[],
    addProduct:()=>void;
}


export default function Catalog({products,addProduct}:Props){
    return (
        <>
            <Button variant="contained" onClick={addProduct}>Add Product</Button>
            <List>
                {products.map((product,index) => (
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar src={product.pictureUrl} />
                        </ListItemAvatar>
                        <ListItemText>
                            {product.name} - {product.price}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </>
    );
}