import "./Login.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import { createUser } from "../../models/User";
import { useNavigate } from "react-router-dom";

export default function Login() {
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
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          name="password"
          required
        />
        <br />
        <Button variant="contained">Login</Button>
        <br />
        <br />
        <Link to={"/register"}>
          <Button variant="contained">Register</Button>
        </Link>
      </div>
    </>
  );
}
