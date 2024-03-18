import {hightlight} from "./color";
import {category_use_id} from "../data/category";

export const timeTableTheme = {
    BaseRow: `
        font-size: 12px;
    `,
    Table: `
        --data-table-library_grid-template-columns: repeat(${category_use_id.length}, minmax(auto, 120px));
       
    `,
    BaseCell: `
        padding: 3px;
        border: 1px solid ${hightlight.light};
    `,
    Row: `
        &:nth-of-type(odd) {
            background-color: ${hightlight.light}
        };
    `,
}
