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
    return (
        <Table data={{nodes}} theme={theme}>
            {() => (
                <React.Fragment>
                    <Header>
                        <HeaderRow>
                            {category_use_id.map((i) => (
                                category_use_id.includes(i) ? (
                                    <HeaderCell>{category[i]}</HeaderCell>
                                ) : null
                            ))}
                        </HeaderRow>
                    </Header>
                    <Body>
                        {Object.entries(nodes).map(([key, value]) => (
                            <Row key={value.id} item={value}>
                                {category_use_id.map((i) => (
                                    <Cell>{value[category_en[i]]}</Cell>
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
