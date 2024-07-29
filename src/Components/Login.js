import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({email:"", password:""})

    let navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const json = await response.json();
          if(json.success){
            //Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Logged in Successfully ", "success")
            navigate("/");

          }
          else{
            props.showAlert("Invalid credentials", "danger")
        }

    }

    function showPassword() {
        var x = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className='login'>
                <h2 className='mt-5 heading'>Login for continue using iNotebook</h2>
                <div className="mb-3 my-5">
                    <label htmlFor="email" className="form-label d-flex justify-content-center"><h5>Email address:</h5></label>
                    <div className=' d-flex justify-content-center'>
                    <input type="email" className="form-control" placeholder='Email address:' id="email" value={credentials.email} name='email' onChange={onChange} aria-describedby="emailHelp"/>
                    </div>
                </div>
                <div className="mb-3 ">
                    <label htmlFor="password" className="form-label d-flex justify-content-center"><h5>Password:</h5></label>
                    <div className=' d-flex justify-content-center'>
                    <input type="password" className="form-control" placeholder='Password:' value={credentials.password} onChange={onChange} name='password' id="password"/>
                    </div>
                    <div className=' d-flex justify-content-center'>
                    <input type="checkbox" className='checkbox' onClick={showPassword} /><h6 className='m-2 pt-1'>Show Password</h6>
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                <button type="submit" className="btn btn-primary">Submit</button>
                <h6 className='my-2'>Don't have account? <Link to='/signup'>Create Your account now!</Link> </h6>
                </div>
            </form>
        </div>
    )
}

export default Login