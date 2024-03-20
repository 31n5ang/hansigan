import TimeTable from "../Component/TimeTable";
import TableCanvas from "../Component/TableCanvas";

import "../style/Main.css"
import {useState} from "react";
import SelectedTable from "../Component/SelectedTable";
import SearchForm from "../Component/SearchForm";
import SelectedTableForm from "../Component/SelectedTableForm";

function Main(props) {
    const [selectedRow, setSelectedRow] = useState();
    const [selectedRowList, setSelectedRowList] = useState([]);
    const [selectedTimeList, setSelectedTimeList] = useState([]);
    const [search, setSearch] = useState("");
    const [searchDepartment, setSearchDepartment] = useState("");
    const [totalHak, setTotalHak] = useState(0);
    const clearSelectedRow = (event) => {
        setSelectedRow(undefined);
    }
    return (
        <>
            <div className="content-container">
                <div>
                    <SearchForm
                        search={search}
                        setSearch={setSearch}
                        searchDepartment={searchDepartment}
                        setSearchDepartment={setSearchDepartment}
                    />
                    <div className="time-table-wrapper">
                        <div className="TimeTable">
                            <TimeTable
                                search={search}
                                searchDepartment={searchDepartment}
                                selectedRow={selectedRow}
                                setSelectedRow={setSelectedRow}
                                selectedRowList={selectedRowList}
                                setSelectedRowList={setSelectedRowList}
                                totalHak={totalHak}
                                setTotalHak={setTotalHak}
                                selectedTimeList={selectedTimeList}
                                setSelectedTimeList={setSelectedTimeList}
                            />
                        </div>
                    </div>
                    <SelectedTableForm
                        setSelectedRowList={setSelectedRowList}
                        totalHak={totalHak}
                    />
                    <div className="selected-table-wrapper">
                        <div className="SelectedTable">
                            <SelectedTable
                                selectedRowList={selectedRowList}
                                setSelectedRowList={setSelectedRowList}
                                totalHak={totalHak}
                                setTotalHak={setTotalHak}
                            />
                        </div>
                    </div>
                </div>
                <div className="TableCanvas" onMouseEnter={clearSelectedRow}>
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
