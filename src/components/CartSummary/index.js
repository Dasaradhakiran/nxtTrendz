// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartCount = cartList.length
      const priceList = cartList.map(
        eachItem => eachItem.price * eachItem.quantity,
      )
      const totalPrice = priceList.reduce((a, b) => a + b)

      return (
        <div>
          <h1 className="cart-summary-head">
            Order Total:{' '}
            <span className="cart-summary-sub-head">Rs {totalPrice}/-</span>
          </h1>
          <p className="cart-summary-text">{cartCount} Items in cart</p>
          <button type="button" className="cart-summary-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
