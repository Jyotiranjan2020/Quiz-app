import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse ml-5" id="navbarNav">
    <img src="https://t3.ftcdn.net/jpg/02/14/31/90/240_F_214319001_5E7Yd1Sp0nqZTxTxxIIHMut2YpR7BVq6.jpg"alt="User Avatar"
        class="user"
        style={{width: '50px',height: '50px', borderRadius: '20px', marginRight: '1200px', marginLeft: '50px'}}
    />
    <Link
        style={{ float: 'right', textDecoration: 'none' }}to={'/login'}className="btn btn-danger">
        Logout
    </Link>
</div>

       
      </nav>
      <div class="container-fluid mt-3">
        <div class="row">
          <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-light sidebar">
            <div class="position-sticky">
              <ul class="nav flex-column mt-5 w-50 p-3">
                <li class="nav-item">
                  <Link class="nav-link mt-2" to={"/sub"}>
                    AddQuestion
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link mt-2" to={"/view"}>
                    ViewQuestion
                  </Link>
                </li>
                
                <li class="nav-item">
                  <Link class="nav-link mt-2" to={"/reuser"}>
                    RegisterUser
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link mt-2" to={"/cont"}>
                    Help & Support
                  </Link>
                </li>
                {/* Add more menu items as needed */}
              </ul>
            </div>
          </nav>
          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 ">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom ">
              <h1 class="h2">Hello Admin ! &#128512;</h1>
            </div>
            {/* Your content goes here */}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Adminimport
  )
}

export default Admin
