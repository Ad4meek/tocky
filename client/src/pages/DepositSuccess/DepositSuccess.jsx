import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getDepositAmount } from "../../models/Money";

function DepositSuccess() {
    const [amount, setAmount] = useState(0);
    const [searchParams] = useSearchParams();
    
    useEffect(() => {
        async function asyncLoad(){
            const depositId = searchParams.get("session_id");
            
            const depositAmount = await getDepositAmount(
                depositId
            );

            setAmount(depositAmount.data.amount);
        }

        asyncLoad();
    }, [])
  
    return (
        <div>
            <h1>Platba byla Úspěšná</h1>
            <h2>Na Váš účet bylo přidáno {amount} kč</h2>

            <Link to={"/tocky"}>
                <Button variant="contained">Jít točit!</Button>
            </Link>
        </div>
    );
}

export default DepositSuccess;
