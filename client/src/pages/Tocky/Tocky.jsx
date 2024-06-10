import "./Tocky.css";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";
import spinTypes from "../../assets/spinTypes.json";
import { Button } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { logoutUser } from "../../models/User";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../helpers/redux/userSlice";
import { addAmountMoney, getUserMoney, removeAmountMoney } from "../../models/Money";

export default function Tocky() {
    const [spinValue, setSpinValue] = useState(1);
    const [spinValueIndex, setSpinValueIndex] = useState(0);
    const spinValuesConstant = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];
    const [backgroundPosition, setBackgroundPosition] = useState(
        Array(16).fill("0px 0px")
    );
    const [spinnedTypes, setSpinnedTypes] = useState([]);

    const spinTypesConstant = Object.keys(spinTypes);

    const acrossIndexes = [
        [0, 5, 10],
        [1, 6, 11],
        [2, 5, 8],
        [3, 6, 9],
        [4, 9, 14],
        [5, 10, 15],
        [6, 9, 12],
        [7, 10, 13],
    ];
    // console.log(backgroundPosition);

    const repeat = () => {
        console.log("točka", spinValue);

        let newBackgroundPositions = [];
        let newSpinnedTypes = [];
        for (let i = 0; i < backgroundPosition.length; i++) {
            const num = randomNumber(spinTypesConstant.length);
            const spinType = spinTypesConstant[num];
            const newPosition = spinTypes[spinType].position;

            if (i % 4 === 0) newSpinnedTypes.push([]);
            newSpinnedTypes[newSpinnedTypes.length - 1].push(spinType);

            newBackgroundPositions.push(
                `-${newPosition.x}px -${newPosition.y}px`
            );
        }
        setSpinnedTypes(newSpinnedTypes);
        setBackgroundPosition(newBackgroundPositions);

        console.log(newSpinnedTypes);
        checkWin(newSpinnedTypes);

        // if (winStatus) {
        //     win();
        // }
    };

    const checkWin = (spinnedTypes) => {
        console.log("checkWin");

        let winningItems = [];

        // check horizontal
        spinnedTypes.forEach((spinnedTypesRow, rowIndex) => {
            spinTypesConstant.forEach((spinType) => {
                const count = spinnedTypesRow.filter(
                    (type) => type === spinType
                ).length;
                // console.log(count, spinType);
                if (count >= 3) {
                    const indexes = getIndexes(
                        spinnedTypesRow,
                        rowIndex,
                        spinType
                    );

                    // are consecutive
                    if (isConsecutive(indexes)) {
                        let itemsArray = [];
                        indexes.forEach((index) => {
                            const item = {
                                index,
                                type: spinType,
                            };
                            itemsArray.push(item);
                        });

                        winningItems.push(itemsArray);
                        console.log("winningItems", winningItems);
                    }
                }
            });
        });

        // check across
        acrossIndexes.forEach((acrossIndex) => {
            let types = [];

            acrossIndex.forEach((index) => {
                const rowIndex = Math.floor(index / 4);
                const columnIndex = index % 4;
                types.push(spinnedTypes[rowIndex][columnIndex]);
            });

            if (types.every((type, _, arr) => type === arr[0])) {
                console.log("win across");

                let itemsArray = [];
                acrossIndex.forEach((index) => {
                    const item = {
                        index,
                        type: types[0],
                    };
                    itemsArray.push(item);
                });

                winningItems.push(itemsArray);

                console.log("winningItems", winningItems);
            }
        });

        if (winningItems.length > 0) {
            win(winningItems);
        }
    };

    const getIndexes = (row, rowIndex, type) => {
        let indexes = [];

        row.forEach((item, index) => {
            if (item === type) {
                indexes.push(index + rowIndex * 4);
            }
        });
        return indexes;
    };

    const isConsecutive = (indexes) => {
        let array = [];
        indexes.forEach((index) => {
            array.push(index % 4);
        });

        if (array.includes(1) && array.includes(2)) {
            return true;
        }
        return false;
    };

    const win = (winningItems) => {
        console.log("win");
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

    const randomNumber = (max) => {
        return Math.floor(Math.random() * max);
    };

    // BAR
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [money, setMoney] = useState(0);


    async function logout() {
        await logoutUser();

        dispatch(reset());

        navigate('/');
    }

    // Get money
    const [updateMoney, setUpdateMoney] = useState(false);

    const userState = useSelector((state) => state.user);

    useEffect(() => {
        async function asyncLoad() {
            const userMoney = await getUserMoney(
                userState.user.uniqueId
            );

            setMoney(userMoney.data.money);
        }

        asyncLoad();

        if (updateMoney) setUpdateMoney(false);
    }, [updateMoney])

    // Add and remove money
    async function removeMoney(amount) {
        await removeAmountMoney(amount, userState.user.uniqueId);

        setUpdateMoney(true);
    }

    async function addMoney(amount) {
        await addAmountMoney(amount, userState.user.uniqueId);

        setUpdateMoney(true);
    }


    return (
        <>
            <h1 className="name">Točky</h1>
            <div className="spinGrid">
                {backgroundPosition.map((position, index) => {
                    return (
                        <div
                            className="tocka"
                            style={{ backgroundPosition: position }}
                            key={index}
                        ></div>
                    );
                })}
            </div>
            <div className="spinOptions">
                <div className="spinValue">
                    <button onClick={remove}>
                        <RemoveIcon></RemoveIcon>
                    </button>
                    <p>{spinValue}</p>
                    <button onClick={add}>
                        <AddIcon></AddIcon>
                    </button>
                </div>
                <p>Výhra: 50</p>
                <button onClick={repeat}>
                    <AutorenewIcon></AutorenewIcon>
                </button>
            </div>



            <div className="bar">
                <p>
                    Zůstatek: {money}
                </p>
                <Link to={"/deposit"}>
                    <Button>
                        Vklad
                    </Button>
                </Link>
                <Button variant="contained" onClick={logout}>
                    Logout
                </Button>
            </div>


            <div>
                <br />
                <br />
                <br />
                <br />
                <h3>Testing</h3>

                <Button onClick={() => removeMoney(50)}>
                    -50kč
                </Button>

                <Button onClick={() => addMoney(50)}>
                    +50kč
                </Button>
            </div>
        </>
    );
}
