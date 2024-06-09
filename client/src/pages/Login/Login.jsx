import "./Login.css";
import { Link, useParams, useSearchParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import { loginUser } from "../../models/User";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsFetched, setIsFetching } from "../../helpers/redux/userSlice";

export default function Login() {
    const [formData, setFormData] = useState();
    const [info, setInfo] = useState();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const isAuthRedirect = searchParams.get("auth-redirect") == "true";

    
    const postForm = async () => {
        if (!formData || !formData.email || !formData.password) {
            return setInfo("Vypln všechny informace");
        }

        dispatch(setIsFetching())
        const user = await loginUser(formData);

        if (user.status === 200) {
            dispatch(setIsFetched({
                status: {
                    isFetching: false
                },
                user: {
                    ...user.data
                }
            }))
            
            redirectToSuccessPage();
        } else {
            setInfo("špatné heslo/email");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePost = (e) => {
        e.preventDefault();
        postForm();
    };

    const redirectToSuccessPage = () => {
        return navigate(`/tocky`);
    };

    return (
        <>
            <div className="container">
                <h1>Login</h1>
                <br />
                <br />
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    name="email"
                    required
                    onChange={(e) => handleChange(e)}
                />
                <br />
                <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    name="password"
                    required
                    onChange={(e) => handleChange(e)}
                />
                <br />
                <Button variant="contained" onClick={handlePost}>
                    Login
                </Button>
                <br />
                <br />
                <Link to={"/register"}>
                    <Button variant="contained">Register</Button>
                </Link>

                {info ? <h1>{info}</h1> : <></>}
                {isAuthRedirect ? <h2>Přihlašte se</h2> : <></>}
            </div>
        </>
    );
}
