import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function DepositCancel() {
    return (
        <div>
            <h1>Platba byla Zrušena</h1>

            <Link to={"/tocky"}>
                <Button variant="contained">Jít točit!</Button>
            </Link>
        </div>
    );
}

export default DepositCancel;
