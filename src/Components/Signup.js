import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;

    const confirmPassword = document.getElementById("cpassword").value;

    if (password !== confirmPassword) {
      props.showAlert("Ooops! Your Passwords does not match correctly", "danger");
      return;
    }

    
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/login");
      props.showAlert("Account Created Successfully ", "success")

    }
    else {
      props.showAlert("Email Already Exists", "danger")
    }


  }

  function showPassword() {
    var x = document.getElementById("password");
    var y = document.getElementById("cpassword");
    if (x.type === "password") {
      x.type = "text";
      y.type = "text";
    } else {
      x.type = "password";
      y.type = "password";
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='signup'>
        <h2 className='mt-5 d-flex justify-content-center'>Create your account for using iNotebook</h2>

        <div className="mb-3 my-5">
          <label htmlFor="name" className="form-label  d-flex justify-content-center "><h5>Name</h5></label>
          <div className=' d-flex justify-content-center'>
            <input type="text" className="form-control" onChange={onChange} id="name" name="name" required />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label  d-flex justify-content-center"><h5>Email address</h5></label>
          <div className=' d-flex justify-content-center'>
            <input type="email" className="form-control" onChange={onChange} id="email" name="email" required />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label  d-flex justify-content-center"><h5>Password</h5></label>
          <div className=' d-flex justify-content-center'>
            <input type="password" className="form-control" onChange={onChange} id="password" name="password" minLength={5} required />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label  d-flex justify-content-center"><h5>Confirm Password</h5></label>
          <div className=' d-flex justify-content-center'>
            <input type="password" className="form-control" onChange={onChange} id="cpassword" name="cpassword" minLength={5} required />
          </div>
        </div>
        <div className=' d-flex justify-content-center'>
          <input type="checkbox" className='checkbox' onClick={showPassword} /><h6 className='m-2 pt-1'>Show Password</h6>
        </div>

        <div className=' d-flex justify-content-center'>
          <button type="submit" className="btn btn-primary">Submit</button>
          <h6 className='my-2'>Already have an account? <Link to='/login'>Login now!</Link> </h6>
        </div>

      </form>
    </div>
  )
}

export default Signup