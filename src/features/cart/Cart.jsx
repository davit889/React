import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart, changeQuantity } from '../../store/reducers/cartReducer/slice.js'
import { selectProductsList } from '../../Store/reducers/productsReducer/slice.js'

const Cart = () => {
  const cart = useSelector(selectProductsList)
  const dispatch = useDispatch()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleIncrease = (item) => {
    dispatch(addToCart(item))
  }

  const handleDecrease = (item) => {
    const newQty = item.quantity - 1
    if (newQty > 0) {
      dispatch(changeQuantity({ id: item.id, quantity: newQty }))
    } else {
      dispatch(removeFromCart(item.id))
    }
  }
  console.log(cart)

  return (
    <div className="cart">
      <h2 className="cart-title">🗑</h2>

      {cart.length === 0 ? (
        <p className="empty">Empty։</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="cart-item-info">
                <p className="cart-item-title">{item.title}</p>
                <div className="cart-quantity-controls">
                  <button onClick={() => handleDecrease(item)} className="btn-decrease">
                    ➖
                  </button>
                  <span className="cart-item-quantity">{item.quantity}</span>
                  <button onClick={() => handleIncrease(item)} className="btn-increase">
                    ➕
                  </button>
                </div>
              </div>
              <span className="cart-item-price">{item.price * item.quantity} դր․</span>
            </li>
          ))}
        </ul>
      )}

      <hr className="divider" />
      <p className="cart-total">Total {total} դր․</p>
    </div>
  )
}

export default Cart
