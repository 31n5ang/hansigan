import TimeTable from "../Component/TimeTable";
import TableCanvas from "../Component/TableCanvas";

import "../style/Main.css"
import {useState} from "react";
import SelectedTable from "../Component/SelectedTable";
import SearchForm from "../Component/SearchForm";
import SelectedTableForm from "../Component/SelectedTableForm";
import MainHeader from "../Component/MainHeader";
import MainFooter from "../Component/MainFooter";

function Main(props) {
    const [selectedRow, setSelectedRow] = useState();
    const [selectedRowList, setSelectedRowList] = useState([]);
    const [selectedTimeList, setSelectedTimeList] = useState([]);
    const [selectedListSelectedRow, setSelectedListSelectedRow] = useState();
    const [search, setSearch] = useState("");
    const [searchDepartment, setSearchDepartment] = useState("");
    const [totalHak, setTotalHak] = useState(0);
    const clearSelectedRow = (event) => {
        setSelectedRow(undefined);
    }
    return (
        <>
            <div className="main-header-container">
                <MainHeader />
            </div>
            <div className="content-container">
                <div className="left-wrapper">
                    <div className="left-sf-tt-wrapper">
                        <div className="SearchForm">
                            <SearchForm
                                search={search}
                                setSearch={setSearch}
                                searchDepartment={searchDepartment}
                                setSearchDepartment={setSearchDepartment}
                            />
                        </div>
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
                    <div className="left-stf-st-wrapper">
                        <div className="SelectedTableForm">
                            <SelectedTableForm
                                selectedRow={selectedRow}
                                setSelectedRow={setSelectedRow}
                                selectedRowList={selectedRowList}
                                setSelectedRowList={setSelectedRowList}
                                totalHak={totalHak}
                                setTotalHak={setTotalHak}
                                selectedTimeList={selectedTimeList}
                                setSelectedTimeList={setSelectedTimeList}
                                selectedListSelectedRow={selectedListSelectedRow}
                                setSelectedListSelectedRow={setSelectedListSelectedRow}
                            />
                        </div>
                        <div className="SelectedTable">
                            <SelectedTable
                                selectedRowList={selectedRowList}
                                setSelectedRowList={setSelectedRowList}
                                totalHak={totalHak}
                                setTotalHak={setTotalHak}
                                selectedTimeList={selectedTimeList}
                                setSelectedTimeList={setSelectedTimeList}
                                selectedListSelectedRow={selectedListSelectedRow}
                                setSelectedListSelectedRow={setSelectedListSelectedRow}
                            />
                        </div>
                    </div>
                </div>
                <div className="right-wrapper" onMouseEnter={clearSelectedRow}>
                    <TableCanvas
                        selectedRow={selectedRow}
                        setSelectedRow={setSelectedRow}
                        selectedRowList={selectedRowList}
                        setSelectedRowList={setSelectedRowList}
                    />
                </div>
            </div>
            <div className="main-footer-container">
                <MainFooter />
            </div>
        </>
    )
}

export default Main;
