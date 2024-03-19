import {hightlight, koreatech} from "./color";
import {category_use_id} from "../data/category";

export const TimeTableTheme = {
    BaseRow: `
        font-size: 12px;
    `,
    Table: `
        // grid-template-columns: repeat(${category_use_id.length}, minmax(auto, 120px));
        grid-template-columns: 
            60px 35px 140px 35px 70px 100px 100px 35px 35px    
        ;
    `,
    BaseCell: `
        padding: 3px;
        border: 1px solid ${hightlight.light};
    `,
    Row: `
        &:nth-of-type(odd) {
            background-color: ${hightlight.light}
        };
        &:nth-of-type(even) {
            background-color: white;
        }
        &:hover .td{
            border-top: 1px solid ${koreatech.orange};
            border-bottom: 1px solid ${koreatech.orange};
            background-color: white;
        }
    `,
    HeaderRow: `
        background-color: ${koreatech.blue};
        color: ${koreatech.orange}; 
        font-size: 13px;
    `,
}
