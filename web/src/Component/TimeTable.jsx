import React, {useState} from "react";
import {
    Table,
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
} from '@table-library/react-table-library/table';
import { useRowSelect } from "@table-library/react-table-library/select";
import { useTheme } from "@table-library/react-table-library/theme";

import {category, category_en, category_use_id} from "../data/category";
import {TimeTableTheme} from "../style/TimeTableTheme";

import output from "../data/output.json";
import SearchForm from "./SearchForm";
// let nodes = output;

const TimeTable = (props) => {
    const {selectedRow, setSelectedRow,
        selectedRowList, setSelectedRowList,
        search, searchDepartment,
        totalHak, setTotalHak,
        selectedTimeList, setSelectedTimeList
    } = props;
    const theme = useTheme(TimeTableTheme);
    const onSelectChange = (action, state) => {
        if (state.id === null) setSelectedRow(null);
        else {
            setSelectedRow(output[state.id - 1]);
        }
    }
    let nodes = output.filter((item) => (
        item.department.includes(searchDepartment) && (
            item.title.includes(search) ||
            item.prof.includes(search)
        )
    ));
    // const nodes = output;
    const select = useRowSelect({nodes}, {
        onChange: onSelectChange
    });

    return (
        <React.Fragment>
            <Table data={{nodes}} theme={theme} select={select} layout={{isDiv: true, fixedHeader: true}}>
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
                            {Object.entries(nodes).map(([key, value]) => (
                                <Row
                                    key={value.id}
                                    item={value}
                                    onDoubleClick={(item, event) => {
                                        const curTimes = item.time;
                                        if (!checkTimes(selectedTimeList, curTimes)) {
                                            alert("중복되는 시간이 있습니다.");
                                        } else {
                                            setSelectedRowList([...selectedRowList, item]);
                                            setTotalHak(totalHak + item.hak);
                                            const newSelectedTimeList = [...selectedTimeList];
                                            for (let i = 0; i < curTimes.length; i++) {
                                                const curTime = curTimes[i];
                                                const numberArray = convertTimeToNumberArray(curTime);
                                                for (let j = 0; j < numberArray.length; j++) {
                                                    newSelectedTimeList.push(numberArray[j]);
                                                }
                                            }
                                            setSelectedTimeList(newSelectedTimeList);
                                        }
                                    }}
                                >
                                    {category_use_id.map((i, index) => (
                                        <Cell key={index}>{value[category_en[i]]}</Cell>
                                    ))}
                                </Row>
                            ))}
                        </Body>
                    </React.Fragment>
                )}
            </Table>
        </React.Fragment>
    )
}

export const convertTimeToNumberArray = (time) => {
    const days = ["", "월", "화", "수", "목", "금"];
    const d = days.indexOf(time.charAt(0));
    const startT = Number(time.substring(1, 3));
    const startTA = time.substring(3, 4);
    const endT = Number(time.substring(5, 7));
    const endTA = time.substring(7, 8);
    const num = endT + (endTA === 'A' ? 0 : 1) - (startT + ( startTA === 'A' ? 0 : 1))
    const retTimes = [];
    const parity = 50;
    for (let i = 0; i < num * 2; i++) {
        retTimes.push((i + (startT * 2 + (startTA === 'A' ? 0 : 1))) + (parity * (d - 1)));
    }
    return retTimes;
}

//중복 시간표 확인
export const checkTimes = (selectedTimeList, times) => {
    for (let i = 0; i < times.length; i++) {
        const time = times[i];
        const retTimes = convertTimeToNumberArray(time);
        for (let j = 0; j < retTimes.length; j++) {
            const currTime = retTimes[j];
            if (selectedTimeList.includes(currTime)) return false;
        }
    }
    return true;
}


export default TimeTable;
