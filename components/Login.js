import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            if (username === "admin" && password === "admin") {
                toast.success("Welcome Admin");
                // If username and password are "admin," redirect to the admin page
                navigate("/admin");
            } else {
                // Handle other logins with your existing logic
                const loginData = {
                    username: username,
                    password: password,
                };

                fetch("http://localhost:8000/user/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(loginData),
                })
                    .then((res) => {
                        if (res.status === 200) {
                            return res.json();
                        } else if (res.status === 401) {
                            // Handle authentication failure
                            toast.error("Invalid username or password");
                        } else {
                            // Handle other errors
                            toast.error("Login failed");
                        }
                    })
                    .then((user) => {
                        if (user) {
                            // Authentication successful
                            toast.success("Login successful");
                            sessionStorage.setItem("username", username);
                            sessionStorage.setItem("userrole", user.role);
                           
                            navigate("/home");
                           
                        }
                    })
                    .catch((err) => {
                        toast.error("Login Failed due to: " + err.message);
                    });
            }
        }
    };

    const validate = () => {
        let result = true;
        if (!username || !password) {
            result = false;
            toast.warning("Please enter both username and password");
        }
        return result;
    };

    return (
        < >
            <div >
                <Navbar/>
            </div>
            <div className="row" >
                <div className="offset-lg-4 col-lg-4" style={{ marginTop: "100px" }}>
                    <form onSubmit={handleLogin} className="container-md">
                        <div className="card">
                            <div className="card-header text-center text-primary">
                                <h2>User Login</h2>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>
                                        User Name <span className="errmsg">*</span>
                                    </label>
                                    <input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>
                                        Password <span className="errmsg">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>{" "}
                                |
                                {" "}
                                <Link className="btn btn-success" to="/register">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
