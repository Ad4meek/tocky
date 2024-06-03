import "./Register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../../models/User";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Register() {
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const postForm = async () => {
    const user = await createUser(formData);
    if (user.status === 201) {
      redirectToSuccessPage(user.payload._id);
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

  const redirectToSuccessPage = (id) => {
    return navigate(`/createduser/${id}`);
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
        <Button onClick={handlePost} variant="contained">
          Register
        </Button>
        <br />
        <br />
        <Link to={"/"}>
          <Button variant="contained">Login</Button>
        </Link>
      </div>
    </>
  );
}
