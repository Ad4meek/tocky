import "./Tocky.css";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import spinTypes from "../../assets/spinTypes.json";

export default function Tocky() {
    const [spinValue, setSpinValue] = useState(1);
    const [spinValueIndex, setSpinValueIndex] = useState(0);
    const spinValuesConstant = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];
    const [backgroundPosition, setBackgroundPosition] = useState("0px 0px");

    const repeat = () => {
        console.log("točka", spinValue);

        const num = randomNumber(spinTypesArray.length);
        const spinType = spinTypesArray[num];
        const position = spinTypes[spinType].position;
        console.log(position);
        setBackgroundPosition(`${position.x}px ${position.y}px`);
    };

    const add = () => {
        if (spinValueIndex === spinValuesConstant.length - 1) {
            return;
        }
        setSpinValue(spinValuesConstant[spinValueIndex + 1]);
        setSpinValueIndex(spinValueIndex + 1);
    };

    const remove = () => {
        if (spinValueIndex === 0) {
            return;
        }
        setSpinValue(spinValuesConstant[spinValueIndex - 1]);
        setSpinValueIndex(spinValueIndex - 1);
    };

    const spinTypesArray = Object.keys(spinTypes);

    const randomNumber = (max) => {
        return Math.floor(Math.random() * max);
    };

    return (
        <>
            <h1>tocky</h1>
            <div className="tocka" style={{backgroundPosition: backgroundPosition}}></div>
            <p>hodnota sazky</p>
            <div className="spinValue">
                <button onClick={remove}>
                    <RemoveIcon></RemoveIcon>
                </button>
                <p>{spinValue}</p>
                <button onClick={add}>
                    <AddIcon></AddIcon>
                </button>
            </div>
            <button onClick={repeat}>
                <AutorenewIcon></AutorenewIcon>
            </button>
        </>
    );
}
