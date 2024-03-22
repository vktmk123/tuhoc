import{ useEffect, useState } from 'react';
import { loginApi } from '../services/UserService';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const[loadingApi, setLoadingApi] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem('token');
        if(token){
            navigate('/');
        }
    },[]);

    const handleLogin = async () => {
        if(!email || !password){
            toast.error('Please enter your email and password');
            return;
        }

        setLoadingApi(true);
        //eve.holt@reqres.in 
        let res = await loginApi(email, password);
        console.log("user res:", res);
        if(res && res.token){
            toast.success('Login success');
            localStorage.setItem('token', res.token);
            navigate('/');
        }else{
            if(res && res.status === 400){
                toast.error(res.data.error);
        }
        setLoadingApi(false);

    }
}

    return (<>
    <div className="login-container col-12 col-sm-4">
        <div className="title">Log in</div>
        <div className='text'>eve.holt@reqres.in</div>
        <input 
        type="text" 
        placeholder="Enter Username"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        />

        <div className='input-2'>
            <input 
            type={isShowPassword === true ?"text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)} 
            />
            <i className={isShowPassword === true ? 'fa-solid fa-eye': 'fa-solid fa-eye-slash' }
            onClick={()=> setIsShowPassword(!isShowPassword)}>

            </i>
        </div>
        
        <button 
            className={email && password ? "active" : ""}
            disabled={(email && password) ? false : true}
            onClick={() => handleLogin(email, password)}
            > {loadingApi && <i className='fa-solid fa-sync fa-spin'></i>}Login</button>
        
        <div className="back">
            <i className="fa-solid fa-angles-left"></i>Go back</div>
    </div>
    
    </>)
}

export default Login;