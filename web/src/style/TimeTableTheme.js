import {hightlight} from "./color";
import {category_use_id} from "../data/category";

export const timeTableTheme = {
    BaseRow: `
        font-size: 13px;
    `,
    Table: `
        --data-table-library_grid-template-columns: repeat(${category_use_id.length}, minmax(auto, 200px));
    `,
    BaseCell: `
        padding: 5px;
    `,
    Row: `
        &:nth-of-type(odd) {
            background-color: ${hightlight.light}
        };
    `,
}
