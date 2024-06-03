import "./Tocky.css";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Tocky() {
    const repeat = () => {
      console.log("točka");
    }

    return (
        <>
            <h1>tocky</h1>
            <div className="tocka"></div>
            <p>hodnota sazky</p>
            <div>
              <button>
                <RemoveIcon></RemoveIcon>
              </button>
              <p></p>
              <button>
                <AddIcon></AddIcon>
              </button>
            </div>
            <button onClick={repeat}>
                <AutorenewIcon></AutorenewIcon>
            </button>
        </>
    );
}
