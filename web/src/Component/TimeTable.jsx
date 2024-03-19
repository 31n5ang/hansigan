import React from "react";
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
const nodes = output;

const TimeTable = (props) => {
    const {selectedRow, setSelectedRow, selectedRowList, setSelectedRowList} = props;
    const theme = useTheme(TimeTableTheme);
    const onSelectChange = (action, state) => {
        if (state.id === null) setSelectedRow(null);
        else {
            setSelectedRow(output[state.id - 1]);
        }
    }
    const select = useRowSelect({nodes}, {
        onChange: onSelectChange
    });
    return (
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
                        {Object.entries(nodes).map(([key, value]) => (
                            <Row
                                key={value.id}
                                item={value}
                                onDoubleClick={(item, event) => {
                                    setSelectedRowList([...selectedRowList, item]);
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
    )
}

export default TimeTable;
