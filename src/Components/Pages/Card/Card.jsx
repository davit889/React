import { useSelector } from 'react-redux'

const Cart = () => {
  const cart = useSelector((state) => state.cart)

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Զամբյուղ</h2>
      <ul className="space-y-1">
        {cart.map((item, index) => (
          <li key={index} className="bg-gray-100 px-3 py-2 rounded">
            {item.title} — ${item.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Cart
