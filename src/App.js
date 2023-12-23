import './App.css';
import {Routes,Route} from 'react-router-dom'
import SiginUp from './COMPONENT/SiginUp';
import Login from './COMPONENT/Login';
import FoodFront from './COMPONENT/FoodFront';


function App() {

  return (
    <div>
      <Routes>
          <Route path='/' element={<SiginUp />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='foodfront' element={<FoodFront />}></Route>
      </Routes>
    
      
    </div>
  );
}

export default App;
