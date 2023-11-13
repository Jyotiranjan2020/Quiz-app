import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.jpg';

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid ">
    <img className="navbar-brand" src={logo} alt="Logo" style={{ borderRadius: "70px", height: "50px" }} />
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse mx-4" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to={"/"}>Home</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to={"/about"}>AboutUs</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to={"/contact"}>Contact</Link>
          </li>
          
        
        </ul>
        <form class="d-flex">
        <Link class="btn btn-warning mx-3 rounded-pill" type="submit" to={"/register"}>Register</Link>
          <Link class="btn btn-warning rounded-pill" type="submit" to={"/login"}>Login</Link>
        </form>
      </div>
    </div>
  </nav>
  )
}

export default Navba
