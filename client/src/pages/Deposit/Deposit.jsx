import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { depositUserMoney } from "../../models/Money";

function Deposit() {
    const [formData, setFormData] = useState();
    const [info, setInfo] = useState();
    const userState = useSelector((state) => state.user);
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    async function handleDeposit(){
        await depositUserMoney(
            userState.user.uniqueId,
            formData
        );
    }
    
    
    return <div>
        <TextField
            id="amount"
            label="How much money?"
            variant="outlined"
            type="number"
            name="amount"
            required
            onChange={(e) => handleChange(e)}
        />

        <Button variant="outlined" onClick={handleDeposit}>
            Deposit!
        </Button>
    </div>;
}

export default Deposit;
