import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../store/reducers/cartReducer/slice.js'
import { selectProductsList } from '../store/reducers/productsReducer/selector'
import axios from 'axios'
import { useEffect } from 'react'
import { setProducts } from '../Store/reducers/productsReducer/slice.js'

const ProductList = () => {
  const products = useSelector(selectProductsList)
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products?limit=8').then((res) => {
      dispatch(setProducts(res.data))
    })
  }, [dispatch])

  return (
    <div className="proect">
      <h2 className="products">Products</h2>
      <div className="products_2">
        {products.map((product) => (
          <div className="my_products" key={product.id}>
            <div className="imageCont">
              <img src={product.image} alt={product.title} />
            </div>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>🗑</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
