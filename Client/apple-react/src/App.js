import React  from 'react';
import './App.css';
import "../src/Resources/css/bootstrap.css"
import "../src/Resources/css/styles.css"
import Header from './Components/Header.js/Header';
import Main from './Components/Main/Main';
import Footer from './Components/Footer.js/Footer';
import Mac from "./Components/Mac/Mac"
import Iphone from './Components/Iphone/Iphone';
import Ipad from './Components/Ipad/Ipad';
import Watch from './Components/Watch/Watch';
import Tv from './Components/Tv/Tv';
import Music from './Components/Music/Music';
import Support from './Components/Support/Support';
import Cart from './Components/Cart/Cart';
import Four04 from './Components/Four04/Four04';
import Productpage from './Components/ProductPage/Productpage';
import{Route,Routes} from"react-router-dom"



function App() {
  return (
    <div className="App">
    <Header/>
      <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/mac" element ={<Mac/>}/>
      <Route path="/iphone" element ={<Iphone/>}/>
      <Route path="/ipad" element ={<Ipad/>}/>
      <Route path="/watch" element={<Watch/>}/>
      <Route path="/tv" element={<Tv/>}/>
      <Route path="/music" element={<Music/>}/>
      <Route path="/support" element={<Support/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="*" element ={<Four04/>}/>
      <Route path="/iphone/:productID" element={<Productpage/>}/>
      </Routes>
        
  
      <Footer/>
      
    </div>
  );
}


export default App;
