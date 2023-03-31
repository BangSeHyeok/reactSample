import './App.css';
import { Department } from './Department';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Dep() {
  const usenavigate=useNavigate();
  useEffect(()=>{
  const isLogin = localStorage.getItem('sesstion') == null ? false : localStorage.getItem('sesstion');
  if(!isLogin){
      localStorage.clear();
      usenavigate('/');
    }
},[localStorage.getItem('sesstion')]);
  
  return (
    <div className="App container">
      <h3 className='d-flex justify-content-center m-3'>
        React JS FrontEnd
      </h3>
      <Department/>
    </div>
  );
}

export default Dep;