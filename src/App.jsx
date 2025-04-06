import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './screens/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import the required components
import Login from './screens/Login'
import Signup from './screens/Signup'
import { CartProvider } from './components/ContextReducer'
import Cart from './screens/Cart'
import Category from './components/Category'
import Food from './components/Food'

function App() {
  const [count, setCount] = useState(0)

  return (
    <CartProvider>
      <Router>  {/* Wrap your app in Router */}
        <div>
          <Routes>
            {/* Define your routes correctly */}
            <Route path="/" element={<Home />} />
            
            <Route path="/login" element={<Login />} />
    
            <Route path="/signup" element={<Signup />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/category" element={<Category />} />

            <Route path="/createfood" element={<Food />} />

            
            {/* Uncomment and define additional routes here */}
            {/* <Route path="/product-detail/:id" element={<ProductDetails />} />
            <Route path="/product-list" element={<ProductList />} /> */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
