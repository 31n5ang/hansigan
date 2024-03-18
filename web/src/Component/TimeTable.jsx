import {CompactTable} from '@table-library/react-table-library/compact';
import { useTheme } from "@table-library/react-table-library/theme";

import {category, category_en, category_use_id} from "../data/category";
import {timeTableTheme} from "../style/TimeTableTheme";
import "../style/TimeTable.css";

import output from "../data/output.json";

const columns = [];
category_use_id.map((i) => (
    columns.push({
        label: category[i],
        renderCell: (item) => item[category_en[i]],
    })
));

const nodes = output;
const TimeTable = (props) => {
    const theme = useTheme(timeTableTheme);
    return (
        <div className="container">
            <CompactTable
                columns={columns}
                data={{nodes}}
                theme={theme}
                layout={{
                    fixedHeader: true,
                    custom: true
                }}
            />
        </div>
    )
}

export default TimeTable;
