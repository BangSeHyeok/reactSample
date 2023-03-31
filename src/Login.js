import {  useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from 'axios';
import { variables } from './Variables';

const Login = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');
    
    const usenavigate=useNavigate();
       
    
    const apiget = (async (url,inputobj)=>{
        let result =0;
        await axios.post(
            url,
            inputobj
           )
           .then((res)=>{
            if(res.data == 1){
                localStorage.setItem("username", JSON.stringify(username));
                localStorage.setItem("sesstion", JSON.stringify(true));
                usenavigate('/home');

            }else{
                    alert('Please Check Username or Password');
                }
            }).catch((err) =>{
                alert(err);
            });
           
    })
    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            let inputobj={
                "US_USER": username,
                "US_PASS": password
            };
            apiget(variables.AUTH_URL,inputobj);
        }
    }
    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            alert('Please Enter Username');
        }
        else if (password === '' || password === null) {
            result = false;
            alert('Please Enter Password');
        }
        return result;
    }
    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLoginusingAPI} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>User Name <span className="errmsg">*</span></label>
                                <input value={username} onChange={e => usernameupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button> 
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;