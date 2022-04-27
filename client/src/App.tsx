import { useEffect, useState } from "react";


function App() {
  const [products,setProducts]=useState([
    {name:"product01",price:100},
    {name:"product02",price:200}
  ]);

  useEffect(()=>{
    
    fetch("http://localhost:5000/api/products")
    .then(response => response.json())
    .then(data => setProducts(data))

  },[])

  function addProduct() {
    setProducts([...products,{name:"product"+(products.length+1),price:(products.length+1)*100}]);
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
