import { useSelector } from 'react-redux'
import { selectCart } from '../../store/reducers/cartReducer/selector'

const Cart = () => {
  const cart = useSelector(selectCart)

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className='cart'>
      <h2></h2>
      {cart.length === 0 ? (
        <p>Empty։</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>${item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
      )}
      <hr />
      <p>Total՝ ${total}</p>
    </div>
  )
}

export default Cart
