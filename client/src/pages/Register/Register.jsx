import "./Register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../../models/User";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Register() {
    const [formData, setFormData] = useState();
    const [info, setInfo] = useState();
    const navigate = useNavigate();

    const postForm = async () => {
        if (!formData || !formData.age || formData.age === "off") {
            return setInfo("Musí ti být 18");
        } else if (
            !formData ||
            !formData.name ||
            !formData.email ||
            !formData.password
        ) {
            return setInfo("Vypln všechny informace");
        }

        const user = await createUser(formData);

        if (user.status === 201) {
            redirectToSuccessPage();
        } else {
            setInfo(user.msg);
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
                <h1>Register</h1>
                <br />
                <br />
                <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    name="name"
                    required
                    onChange={(e) => handleChange(e)}
                />

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
                <div className="age_control">
                    <p>I'am over 18 years old</p>{" "}
                    <FormControlLabel
                        required
                        control={<Checkbox />}
                        name="age"
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <br />
                <Button onClick={handlePost} variant="contained">
                    Register
                </Button>
                <br />
                <br />
                <Link to={"/"}>
                    <Button variant="contained">Login</Button>
                </Link>

                {info ? <h1>{info}</h1> : <></>}
            </div>
        </>
    );
}
