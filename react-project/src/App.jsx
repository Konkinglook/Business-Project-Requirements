import { useState,useEffect } from 'react'
import './App.css'
import productData from './data/all_product'

function App() {
  const [filteredProduct, setFilteredProduct] = useState(productData);
  const [category, setCategory] = useState('All');
  const [products, setProducts] = useState(productData);
  const [sortOrder,setSortOrder] = useState('');
  const [searchItem,setSearchItem] = useState('');

  useEffect(() =>{
    let updateProducts = products;

    //Filter by category
    if (category !== 'All') {
        updateProducts = updateProducts.filter(product => product.category === category)
    }
    //Sort By Price
    if (sortOrder === 'low-to-high') {
        //Shallow Copy
        updateProducts = [...updateProducts].sort((a,b) => a.price - b.price); //[...updateProducts] Shallow Copy
    }
    else if (sortOrder === 'high-to-low') {
        updateProducts = [...updateProducts].sort((a,b) => b.price - a.price);
    }

    // Search bar 
    if (searchItem) {
        updateProducts =updateProducts.filter(product => product.name.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()))
    }
    setFilteredProduct(updateProducts);

  },[products,category,sortOrder,searchItem])

  return (
    <>
        <h1>Product List</h1>
        <hr />

        <div>
            <label htmlFor="search">
                Search:
                <input type="text" value={searchItem} onChange={(e) => setSearchItem(e.target.value)} placeholder='Search item'/>
            </label>
        </div>
        <div>
            <h3>Filter By Category</h3>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="All">ALL</option>
                <option value="girl">Girl</option>
                <option value="boy">Boy</option>
                <option value="shoes">Shoes</option>
                <option value="accessories">Accessories</option>
            </select>
        </div>

        <div>
            <h3>Sort By Price</h3>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="">None</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
            </select>
        </div>

        <div className='product-list'>
           {filteredProduct.map(product =>(
            <div key={product.id} className='product-item'>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
            </div>
           ))}
        </div>
    </>
  )
}

export default App
