import React, {useEffect} from "react";
import {Body, Cell, Header, HeaderCell, HeaderRow, Row, Table} from "@table-library/react-table-library/table";

import output from "../data/output.json";
import {category, category_en, category_use_id} from "../data/category";
import {TimeTableTheme} from "../style/TimeTableTheme";
import {useTheme} from "@table-library/react-table-library/theme";
import {useRowSelect} from "@table-library/react-table-library/select";
import {convertTimeToNumberArray} from "./TimeTable";
const nodes = output;
function SelectedTable(props) {
    const {selectedRowList, setSelectedRowList,
        totalHak, setTotalHak,
        selectedListSelectedRow, setSelectedListSelectedRow,
        selectedTimeList, setSelectedTimeList
    } = props;
    const theme = useTheme(TimeTableTheme);
    const onSelectChange = (action, state) => {
        if (state.id === null) setSelectedListSelectedRow(null);
        else {
            setSelectedListSelectedRow(output[state.id - 1]);
        }
    }
    const select = useRowSelect({nodes}, {
        onChange: onSelectChange
    });
    return (
        <>
            <Table data={{nodes}} theme={theme} select={select}>
                {() => (
                    <React.Fragment>
                        <Header>
                            <HeaderRow>
                                {category_use_id.map((i, index) => (
                                    category_use_id.includes(i) ? (
                                        <HeaderCell key={index}>{category[i]}</HeaderCell>
                                    ) : null
                                ))}
                            </HeaderRow>
                        </Header>
                        <Body>
                            {Object.entries(selectedRowList).map(([key, value]) => (
                                <Row key={value.id} item={value} onDoubleClick={(item, event) => {
                                    const newSelectedRowList = selectedRowList.filter((selectedRow) => (
                                        (item.id !== selectedRow.id)
                                    ));
                                    setSelectedRowList(newSelectedRowList);
                                    setTotalHak(totalHak - item.hak);
                                    let newSelectedTimeList = [...selectedTimeList];
                                    const willDeleteTimeList = [];
                                    const curTimes = item.time;
                                    for (let k = 0; k < curTimes.length; k++) {
                                        const curTime = curTimes[k];
                                        const numberArray = convertTimeToNumberArray(curTime);
                                        for (let i = 0; i < numberArray.length; i++) {
                                            willDeleteTimeList.push(numberArray[i]);
                                        }
                                    }
                                    newSelectedTimeList = newSelectedTimeList.filter((item) => (
                                        !willDeleteTimeList.includes(item)
                                    ));
                                    setSelectedTimeList(newSelectedTimeList);
                                }}>
                                    {category_use_id.map((i, index) => (
                                        <Cell key={index}>{value[category_en[i]]}</Cell>
                                    ))}
                                </Row>
                            ))}
                        </Body>
                    </React.Fragment>
                )}
            </Table>
        </>
    )
}

export default SelectedTable;
