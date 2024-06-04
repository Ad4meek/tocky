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
    const [backgroundPosition, setBackgroundPosition] = useState(Array(9).fill("0px 0px"));

    console.log(backgroundPosition);

    const repeat = () => {
        console.log("točka", spinValue);

        const newBackgroundPositions = []
        for (let i = 0; i < backgroundPosition.length; i++) {
            const num = randomNumber(spinTypesArray.length);
            const spinType = spinTypesArray[num];
            const newPosition = spinTypes[spinType].position;
            newBackgroundPositions.push(`${newPosition.x}px ${newPosition.y}px`);
        }
        setBackgroundPosition(newBackgroundPositions)
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
            <div className="spinGrid">
                {backgroundPosition.map((position, index) => {
                    return <div className="tocka" style={{ backgroundPosition: position }} key={index}></div>
                })}
                {/* <div className="tocka" style={{ backgroundPosition: backgroundPosition }}></div>
                <div className="tocka" style={{ backgroundPosition: backgroundPosition }}></div>
                <div className="tocka" style={{ backgroundPosition: backgroundPosition }}></div>
                <div className="tocka" style={{ backgroundPosition: backgroundPosition }}></div>
                <div className="tocka" style={{ backgroundPosition: backgroundPosition }}></div>
                <div className="tocka" style={{ backgroundPosition: backgroundPosition }}></div>
                <div className="tocka" style={{ backgroundPosition: backgroundPosition }}></div>
                <div className="tocka" style={{ backgroundPosition: backgroundPosition }}></div>
                <div className="tocka" style={{ backgroundPosition: backgroundPosition }}></div> */}
            </div>
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
