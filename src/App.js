
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./Pages/Home"
import About from './Pages/About';
import Settings from './Pages/Settings';
import Analytics from './Pages/Analytics';
import Products from './Pages/Products';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/analytics' element={<Analytics/>}/>
      <Route path='/settings' element={<Settings/>}/>
      <Route path='/products' element={<Products/>}/>
        
      
    </Routes>
    </BrowserRouter>
    {/* <Sidenav/> */}
    </>
   
  );
}

export default App;
