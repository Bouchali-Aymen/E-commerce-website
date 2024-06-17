
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import '../app/globals.css'
import './css/login.css'
import view from '../app/component/assets/view.png'
import hide from '../app/component/assets/hide.png'
import Image from "next/image";


const LoginSignup = () => {


    const router = useRouter();


    const [icon,setIcon] = useState(false);

    const [user,setUser] = useState({
        name:"",
        email:"",
        password:""
    });

    const handleChange = (e) => {
        const {name,value} = e.target;

        setUser({
            ...user,
            [name]:value
        })
        console.log(user);
    }

    const Register = async(event) => {
        event.preventDefault();
        const {name,email,password} = user;
        if(name && email && password){
            try{
                const response = await fetch('http://localhost:4000/api/signup', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(user),
            })
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            localStorage.setItem("token", data.token);
            console.log(data);
            window.location.replace('/')
        }
            catch(e){
                console.log(e);
            }
        }
        else{
            alert('invalid input');
        }
    }

    const Login = async(event) => {
        event.preventDefault();
        const {name,email,password} = user;
        if(email && password){
            try{
                const response = await fetch('http://localhost:4000/api/signin', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(user),
            })
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            localStorage.setItem("token", data.token);
            router.push('/');
        }
            catch(e){
                console.log(e);
            }
        }
        else{
            alert("invalid input");
        }
    }



    const displaypassword = () => {
        let password = document.querySelector('.password-field');
        let eyeIcon = document.querySelector('.display-password');
        let register = document.querySelector('.register-password-field');
        if(password.type==='password' && icon===false || register.type==='password' && icon===false){
            password.type='text';
            register.type='text'
            setIcon(true)
        }
        else{
            setIcon(false);
            password.type='password'
            register.type='password'
        }
        
    }


    
    
    return (
            <div className="auth">
            
            <div className="content">

                {/*LogIn Here*/}

                <form action="" className="login-form" onSubmit={Login}>
                    <h3>Login</h3>
                    <input type="email" name="email" id="" placeholder="Email address" onChange={handleChange}/>
                    <div className="password">
                    <input type="password" name="password" id="" placeholder="Password" onChange={handleChange} className='password-field'/>
                    <Image
                    src={icon?hide:view}
                    alt='view'
                    width={20}
                    height={20}
                    className='display-password'
                    onClick={displaypassword}
                    />
                    </div>
                    
                    <input type="submit" value="Continue" />
                    <p>Creat an account? <span onClick={()=>{
                        let login = document.querySelector('.login-form');
                        let signup = document.querySelector('.signup-form');
                        login.style.display = 'none';
                        signup.style.display = 'flex'

                    }}>Click here</span></p>
                    <div className="terms">
                    <input type="checkbox" name="agree" id="" />
                    <label htmlFor="agree">By continuing, i agree to the terms of the use & privacy plicy</label>
                    </div>    
                </form>

                {/*Sign Up Here*/}

                <form action="" className="signup-form" onSubmit={Register}>
                    <h3>Sign Up</h3>
                    <input type="text" name="name" value={user.name}  placeholder="Your name" onChange={handleChange}/>
                    <input type="email" name="email" id="" value={user.email} placeholder="Email address" onChange={handleChange}/>
                    <div className="register-password">
                    <input type="password" name="password" id="" value={user.password} placeholder="Password" onChange={handleChange} className='register-password-field'/>
                    <Image
                    src={icon?hide:view}
                    alt='view'
                    width={20}
                    height={20}
                    className='display-password'
                    onClick={displaypassword}
                    />
                    </div>
                    
                    <input type="submit" value="Continue"/>
                    <p>Already have an account? <span
                    onClick={()=>{
                        let login = document.querySelector('.login-form');
                        let signup = document.querySelector('.signup-form');
                        login.style.display = 'flex';
                        signup.style.display = 'none'

                    }}>Login Here</span></p>
                    <div className="terms">
                    <input type="checkbox" name="agree" id="" />
                    <label htmlFor="agree">By continuing, i agree to the terms of the use & privacy plicy</label>
                    </div>    
                </form>
            </div>
        </div>
        
        
    )
}


export default LoginSignup