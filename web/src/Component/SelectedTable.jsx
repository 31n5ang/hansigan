import React, {useEffect} from "react";
import {Body, Cell, Header, HeaderCell, HeaderRow, Row, Table} from "@table-library/react-table-library/table";

import output from "../data/output.json";
import {category, category_en, category_use_id} from "../data/category";
import {TimeTableTheme} from "../style/TimeTableTheme";
import {useTheme} from "@table-library/react-table-library/theme";
const nodes = output;
function SelectedTable(props) {
    const {selectedRowList, setSelectedRowList} = props;
    const theme = useTheme(TimeTableTheme);
    useEffect(() => {

    }, []);
    return (
        <>
            <Table data={{nodes}} theme={theme}>
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
                                <Row key={value.id} item={value}>
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
