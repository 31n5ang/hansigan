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
import { useRowSelect, SelectTypes } from "@table-library/react-table-library/select";
import { useTheme } from "@table-library/react-table-library/theme";

import {category, category_en, category_use_id} from "../data/category";
import {timeTableTheme} from "../style/timeTableTheme";

import output from "../data/output.json";
const nodes = output;

const TimeTable = (props) => {
    const theme = useTheme(timeTableTheme);
    const onSelectChange = (action, state) => {
        console.log(action, state)
    }
    const select = useRowSelect({nodes}, {
        // onChange: onSelectChange
    });
    const onRowDoubleClick = (item, event) => {
        console.log(item, event);
    }
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
                                    console.log(item, event);
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
