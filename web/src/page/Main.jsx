import TimeTable from "../Component/TimeTable";
import TableCanvas from "../Component/TableCanvas";

import "../style/Main.css"
import {useState} from "react";
import SelectedTable from "../Component/SelectedTable";

function Main(props) {
    const [selectedRow, setSelectedRow] = useState();
    const [selectedRowList, setSelectedRowList] = useState([]);
    return (
        <>
            <div className="content-container">
                <div className="table-wrapper">
                    <div className="TimeTable">
                        <TimeTable
                            selectedRow={selectedRow}
                            setSelectedRow={setSelectedRow}
                            selectedRowList={selectedRowList}
                            setSelectedRowList={setSelectedRowList}
                        />
                    </div>
                    <div className="ClassList">
                        <SelectedTable
                            selectedRowList={selectedRowList}
                            setSelectedRowList={setSelectedRowList}
                        />
                    </div>
                </div>
                <div className="TableCanvas">
                    <TableCanvas
                        selectedRow={selectedRow}
                        setSelectedRow={setSelectedRow}
                        selectedRowList={selectedRowList}
                        setSelectedRowList={setSelectedRowList}
                    />
                </div>
            </div>
        </>
    )
}

export default Main;
