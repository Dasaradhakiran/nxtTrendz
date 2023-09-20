import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const getAddProduct = cartList.find(eachItem => eachItem.id === id)
    getAddProduct.quantity += 1
    const newList = cartList.map(eachItem => {
      if (eachItem.id !== id) {
        return eachItem
      }
      return getAddProduct
    })

    this.setState({cartList: newList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const getAddProduct = cartList.find(eachItem => eachItem.id === id)
    const filterProducts = cartList.filter(eachItem => eachItem.id !== id)
    if (getAddProduct.quantity > 1) {
      getAddProduct.quantity -= 1
      const newList = cartList.map(eachItem => {
        if (eachItem.id !== id) {
          return eachItem
        }
        return getAddProduct
      })

      this.setState({cartList: newList})
    } else {
      this.setState({cartList: filterProducts})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filterList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: filterList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const getAddProduct = cartList.find(eachItem => eachItem.id === product.id)
    if (getAddProduct === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      getAddProduct.quantity += product.quantity
      const newList = cartList.map(eachItem => {
        if (eachItem.id !== product.id) {
          return eachItem
        }
        return getAddProduct
      })

      this.setState({cartList: newList})
    }
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
