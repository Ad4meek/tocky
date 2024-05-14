import "./Tocky.css";
import AutorenewIcon from "@mui/icons-material/Autorenew";

export default function Tocky() {
    const repeat = () => {
      console.log("točka");
    }

    return (
        <>
            <p>tocky</p>
            <button onClick={repeat}>
                <AutorenewIcon></AutorenewIcon>
            </button>
        </>
    );
}
