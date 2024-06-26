import "./Tocky.css";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useRef, useState } from "react";
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
    const [backgroundPosition, setBackgroundPosition] = useState(Array(16).fill("0px 0px"));
    const [winValue, setWinValue] = useState(0);
    const [canSpin, setCanSpin] = useState(true);
    const [noMoney, setNoMoney] = useState(false);

    const spinTypesConstant = Object.keys(spinTypes);

    const acrossIndexes = [
        [0, 5, 10],
        [2, 5, 8],
        [4, 9, 14],
        [6, 9, 12],
    ];

    const draw = (ctx, posX, posY, finalX, finalY, width, direction) => {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo(posX, posY);
        ctx.lineTo(finalX, finalY);
        if (direction === "horizontal") {
            ctx.lineTo(finalX, finalY + width);
            ctx.lineTo(posX, posY + width);
        } else {
            ctx.lineTo(finalX + width, finalY);
            ctx.lineTo(posX + width, posY);
        }
        ctx.lineTo(posX, posY);
        ctx.fill();
    };

    const animation = (positions) => {
        console.log("positions", positions);
        let newPositions = updatePosition(positions, 1400);
        console.log("newPositions", newPositions);
        setBackgroundPosition(newPositions);

        const animationInterval = setInterval(() => {
            console.log(positions[0], newPositions[0]);
            if (positions[0] === newPositions[0]) {
                clearInterval(animationInterval);
                return;
            }
            newPositions = updatePosition(newPositions, -200);
            setBackgroundPosition(newPositions);
        }, 100);
    };

    const updatePosition = (positions, adding) => {
        let newPositions = [];
        positions.forEach((position, index) => {
            let x = position.split(" ")[0];
            let y = position.split(" ")[1];
            y = parseInt(y, 10);
            y += adding;
            newPositions.push(`${x} ${y}px`);
        });
        return newPositions;
    };

    const clearCanvas = (ctx) => {
        ctx.clearRect(0, 0, 800, 800);
    };

    const canvasRef = useRef(null);
    const [ctx, setCtx] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 800;
        canvas.height = 800;
        setCtx(canvas.getContext("2d"));
    }, []);

    const repeat = () => {
        if(spinValue > money){
            setNoMoney(true);
            
            return;
        }
        
        setNoMoney(false);
        
        
        console.log("točka", spinValue);
        if (!canSpin) return;
        setCanSpin(false);
        clearCanvas(ctx);
        setWinValue(0);

        let newBackgroundPositions = [];
        let newSpinnedTypes = [];
        for (let i = 0; i < backgroundPosition.length; i++) {
            const num = randomNumber(spinTypesConstant.length);
            const spinType = spinTypesConstant[num];
            const newPosition = spinTypes[spinType].position;

            if (i % 4 === 0) newSpinnedTypes.push([]);
            newSpinnedTypes[newSpinnedTypes.length - 1].push(spinType);

            newBackgroundPositions.push(`${newPosition.x}px ${newPosition.y}px`);
        }
        setBackgroundPosition(newBackgroundPositions);

        console.log(newSpinnedTypes);
        animation(newBackgroundPositions);
        checkWin(newSpinnedTypes);
    };

    const checkWin = (spinnedTypes) => {
        console.log("checkWin");

        let winningItems = [];

        // check horizontal
        spinnedTypes.forEach((spinnedTypesRow, rowIndex) => {
            spinTypesConstant.forEach((spinType) => {
                const count = spinnedTypesRow.filter((type) => type === spinType).length;
                if (count >= 3) {
                    const indexes = getIndexes(spinnedTypesRow, rowIndex, spinType);

                    // are consecutive
                    if (isConsecutive(indexes) && indexes[0] % 4 === 0) {
                        let itemsArray = {
                            direction: "horizontal",
                            items: [],
                        };
                        indexes.forEach((index) => {
                            const item = {
                                index,
                                type: spinType,
                            };
                            itemsArray.items.push(item);
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
                let itemsArray = {
                    direction: "across",
                    items: [],
                };
                acrossIndex.forEach((index) => {
                    const item = {
                        index,
                        type: types[0],
                    };
                    itemsArray.items.push(item);
                });

                winningItems.push(itemsArray);

                console.log("winningItems", winningItems);
            }
        });

        if (winningItems.length > 0) {
            win(winningItems);
        }
        else {
            removeMoney(spinValue);
        }

        setTimeout(() => {
            console.log("winValue", winValue);
            setCanSpin(true);
        }, 1000 * winningItems.length);
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

        let newWinValue = 0;

        winningItems.forEach((item, index) => {
            let items = item.items;
            for (let i = 1; i < items.length; i++) {
                const item1 = items[i - 1];
                const item2 = items[i];
                const offset = {
                    horizontal: {
                        x: 100,
                        y: 110,
                    },
                    across: {
                        x: 75,
                        y: 100,
                    },
                };

                const position1 = getPosition(item1.index, offset[item.direction]);
                const position2 = getPosition(item2.index, offset[item.direction]);

                let direction = "across";
                let width = 20;
                if (position1.y === position2.y) {
                    direction = "horizontal";
                    width = 12;
                }

                setTimeout(() => {
                    draw(ctx, position1.x, position1.y, position2.x, position2.y, width, direction);
                }, 1000 * (index + 1));
            }
            console.log(item);

            if (item.direction === "horizontal" && item.items.length === 4) {
                newWinValue += 2 * spinTypes[item.items[0].type].win * spinValue;
            } else {
                newWinValue += spinTypes[item.items[0].type].win * spinValue;
            }
        });
        setTimeout(() => {
            setWinValue(newWinValue);
            addMoney(newWinValue - spinValue);
        }, 1000 * winningItems.length + 1);
    };

    const getPosition = (index, offset) => {
        return {
            x: (index % 4) * 200 + offset.x,
            y: Math.floor(index / 4) * 200 + offset.y,
        };
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

        navigate("/");
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
            <canvas className="canvas" ref={canvasRef}></canvas>
            <div className="spinValue">
                <button onClick={remove}>
                    <RemoveIcon></RemoveIcon>
                </button>
                <p>{spinValue}</p>
                <button onClick={add}>
                    <AddIcon></AddIcon>
                </button>
                <p>Výhra: {winValue}</p>
            </div>
            <button onClick={repeat}>
                <AutorenewIcon></AutorenewIcon>
            </button>

            { 
                noMoney ? <h2>Nemáte dostatek peněz</h2> : <></>
            }

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
        </>
    );
}
