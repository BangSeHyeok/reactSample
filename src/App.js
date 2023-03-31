import './App.css';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Dep from './Dep';

function App() {
  let isLogin = localStorage.getItem('sesstion') == null ? false : localStorage.getItem('sesstion');
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route exact path='/' element={isLogin ? <Home/> : <Login/>}></Route>
        <Route exact path='/home' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/dep' element={<Dep/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
