import TimeTable from "../Component/TimeTable";
import TableCanvas from "../Component/TableCanvas";

import "../style/Main.css"
import {useState} from "react";
import SelectedTable from "../Component/SelectedTable";
import SearchForm from "../Component/SearchForm";

function Main(props) {
    const [selectedRow, setSelectedRow] = useState();
    const [selectedRowList, setSelectedRowList] = useState([]);
    const [search, setSearch] = useState("");
    const [searchDepartment, setSearchDepartment] = useState("");
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
                            />
                        </div>
                    </div>
                    <div className="selected-table-wrapper">
                        <div className="SelectedTable">
                            <SelectedTable
                                selectedRowList={selectedRowList}
                                setSelectedRowList={setSelectedRowList}
                            />
                        </div>
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
