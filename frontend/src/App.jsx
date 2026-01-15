import { useState } from 'react'
import NavBar from './Components/NavBar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProductsPage from './Pages/ProductsPage';


function App() {
return(
  <>
    <div className='min-h-screen bg-base-200 transition-colors duration-300'>
      
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/product/:id' element={<ProductsPage/>}></Route>
      </Routes>
    </div>
  </>
);
  
}

export default App
