import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from './Navbar'

const Register = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("india");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("female");

    const navigate = useNavigate();

    const IsValidate = () => {
        let isProceed = true;
        let errorMessage = "Please enter the value in ";
        
        if (!id) {
            isProceed = false;
            errorMessage += "Username";
        }
        if (!name) {
            isProceed = false;
            errorMessage += "Fullname";
        }
        if (!password) {
            isProceed = false;
            errorMessage += "Password";
        }
        if (!email) {
            isProceed = false;
            errorMessage += "Email";
        }

        if (!isProceed) {
            toast.warning(errorMessage);
        } else {
            if (
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
            ) {
                // Valid email
            } else {
                isProceed = false;
                toast.warning("Please enter a valid email");
            }
        }

        return isProceed;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const regobj = {
            id,
            name,
            password,
            email,
            phone,
            country,
            address,
            gender,
        };

        if (IsValidate()) {
            // Send the registration request to the Spring Boot API
            fetch("http://localhost:8000/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(regobj),
            })
                .then((springBootResponse) => {
                    if (springBootResponse.ok) {
                        // Registration succeeded in Spring Boot
                        toast.success("Registered successfully.");
                        navigate("/login");
                    } else {
                        // Handle Spring Boot registration error
                        return Promise.reject("Registration failed in Spring Boot.");
                    }
                })
                .catch((err) => {
                    toast.error("Failed: " + err);
                });
        }
    };

    return (<>
        <div>
               <Navbar/>
        </div>
        <div>
            <div className="offset-lg-3 col-lg-6 mt-5">
                <form className="container" onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-header text-center">
                            <h1>User Registration</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            User Name <span className="errmsg">*</span>
                                        </label>
                                        <input
                                            value={id}
                                            onChange={(e) => setId(e.target.value)}
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Password <span className="errmsg">*</span>
                                        </label>
                                        <input
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            type="password"
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Full Name{" "}
                                            <span className="errmsg">*</span>
                                        </label>
                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Email <span className="errmsg">*</span>
                                        </label>
                                        <input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="form-control"
                                        ></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Country <span className="errmsg">*</span>
                                        </label>
                                        <select
                                            value={country}
                                            onChange={(e) =>
                                                setCountry(e.target.value)
                                            }
                                            className="form-control"
                                        >
                                            <option value="india">India</option>
                                            <option value="usa">USA</option>
                                            <option value="singapore">Singapore</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <textarea
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                            className="form-control"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <br></br>
                                        <input
                                            type="radio"
                                            checked={gender === "male"}
                                            onChange={(e) =>
                                                setGender(e.target.value)
                                            }
                                            name="gender"
                                            value="male"
                                            className="app-check"
                                        />
                                        <label>Male</label>{" "}
                                        <input
                                            type="radio"
                                            checked={gender === "female"}
                                            onChange={(e) =>
                                                setGender(e.target.value)
                                            }
                                            name="gender"
                                            value="female"
                                            className="app-check"
                                        />
                                        <label>Female</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>{" "}
                            |
                            {" "} <Link to={"/login"} className="btn btn-danger">
                                Close
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div></>
    );
};

export default Register
