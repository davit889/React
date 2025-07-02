import ProductList from './features/ProductList'
import './App.css'
import Cart from './features/cart/cart'

function App() {
  return (
    <div className="product-card">
      <h1>our shop</h1>
      <ProductList />
      <Cart />
    </div>
  )
}
export default App
