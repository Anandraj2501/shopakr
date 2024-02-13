
import './App.css';
import Main from './Components/Navbar/Main/Main';
import { Routes, Route } from 'react-router';
import Shop from './Components/Navbar/ShopPage/Shop';
import ProductDetails from './Components/Navbar/ProductDetails/ProductDetails';
import Cart from './Components/Navbar/Cart/Cart';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
