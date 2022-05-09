import { useEffect, useState } from "react";
import { Product } from "../models/product";


function App() {
  const [products,setProducts]=useState<Product[] >([]);

  useEffect(()=>{
    
    fetch("http://localhost:5000/api/products")
    .then(response => response.json())
    .then(data => setProducts(data))

  },[])

  function addProduct() {
    setProducts([
      ...products,
      {
        id:products.length+101,
        name:"product"+(products.length+1),
        price:(products.length+1)*100,
        brand:'some brand',
        description: 'some description',
        pictureUrl:'http://picsum.photos/200'
      }
    ]);
  }


  return (
    <div className="App">
      <h1 style={{color:'blue'}}>Store</h1>
      <button onClick={addProduct}>Add Product</button>
      <ul>
        {products.map((product,index) => (
          <li key={index}>
            {product.name} {product.price}
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default App;
