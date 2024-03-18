import TimeTable from "../Component/TimeTable";
import TableCanvas from "../Component/TableCanvas";

import "../style/Main.css"

function Main(props) {
    return (
        <div className="main-container">
            <div className="TimeTable"><TimeTable /></div>
            <div className="TableCanvas"><TableCanvas /></div>
        </div>
    )
}

export default Main;
