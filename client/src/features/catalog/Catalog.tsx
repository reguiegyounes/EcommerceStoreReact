import { Product } from "../../app/models/product";



interface Props{
    products:Product[],
    addProduct:()=>void;
}


export default function Catalog({products,addProduct}:Props){
    return (
        <>
            <button onClick={addProduct}>Add Product</button>
            <ul>
                {products.map((product,index) => (
                    <li key={index}>
                        {product.name} {product.price}
                    </li>
                ))}
            </ul>
        </>
    );
}