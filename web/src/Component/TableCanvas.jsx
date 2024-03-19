import React, { useEffect, useRef } from 'react';

import output from "../data/output.json";
import {koreatech} from "../style/color";

const TableCanvas = (props) => {
    const {selectedRow, setSelectedRow, selectedRowList, setSelectedRowList} = props;
    const canvasRef = useRef(null);
    const nodes = output;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const day = ["", "월", "화", "수", "목", "금"];
        const defaultLineWidth = 0.2;
        const timeTitle = [
            '01A 09:00',
            '01B 09:30',
            '02A 10:00',
            '02B 10:30',
            '03A 11:00',
            '03B 11:30',
            '04A 12:00',
            '04B 12:30',
            '05A 13:00',
            '05B 13:30',
            '06A 14:00',
            '06B 14:30',
            '07A 15:00',
            '07B 15:30',
            '08A 16:00',
            '08B 16:30',
            '09A 17:00',
            '09B 17:30',
        ];


        // 캔버스 초기화
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.lineWidth = defaultLineWidth;

        // 표 그리기
        const cellWidth = canvas.width / day.length;
        const cellHeight = 30;
        const startX = 0;
        const startY = 0;

        //영역표시
        context.strokeRect(startX, startY, canvas.width, canvas.height);

        // 월 화 수 목 금 타이틀 그리기
        context.font = '15px Arial';
        context.textAlign = 'center';
        for (let i = 0; i < day.length; i++) {
            context.strokeRect(startX + cellWidth * i, startY, cellWidth, cellHeight);
            context.fillText(day[i], startX + cellWidth / 2 + cellWidth * i, startY + cellHeight / 2 + 5);
        }
        for (let i = 0; i < 18; i++) {
            for (let j = 0; j < 6; j++) {
                context.strokeRect(startX + cellWidth * j, startY + cellHeight * (i + 1), cellWidth, cellHeight);
            }
        }
        for (let i = 0; i < 18; i++) {
            context.font = '13px Arial'
            context.fillText(timeTitle[i], startX + cellWidth / 2, startY + cellHeight * (i + 2) - 10);
        }

        /*
         * 선택한 열 표시
         */
        if (selectedRow?.title !== undefined) {
            // context.fillText(selectedRow.title, startX + cellWidth, startY + cellHeight);
            const sameTitleRows = [];
            let tmp;
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].title === selectedRow.title) {
                    if (nodes[i].id === selectedRow.id) {
                        tmp = nodes[i];
                    } else sameTitleRows.push(nodes[i]);
                }
            }
            sameTitleRows.push(tmp);
            for (let i = 0; i < sameTitleRows.length; i++) {
                context.lineWidth = 2;
                context.strokeStyle = koreatech.orange;
                if (selectedRow.id === sameTitleRows[i].id) {
                    context.lineWidth = 4;
                    context.strokeStyle = koreatech.blue;
                }
                const times = sameTitleRows[i].time;
                for (let i = 0; i < times.length; i++) {
                    const time = times[i];
                    const d = day.indexOf(time.charAt(0));
                    const startT = Number(time.substring(1, 3));
                    const startTA = time.substring(3, 4);
                    const endT = Number(time.substring(5, 7));
                    const endTA = time.substring(7, 8);

                    const startBoxX = startX + cellWidth * d;
                    const startBoxY = startY + cellHeight * (1 + (startT - 1) * 2 + (startTA === 'A' ? 0 : 1));
                    const width = cellWidth;
                    const height = 2 * cellHeight * (endT + (endTA === 'A' ? 0 : 1) - (startT + ( startTA === 'A' ? 0 : 1)));

                    context.strokeRect(startBoxX, startBoxY, width, height);
                    // context.fillText(time, startBoxX, startBoxY);
                }
                context.lineWidth = defaultLineWidth;
                context.strokeStyle = "black";
            }
        }
    }, [selectedRow, setSelectedRowList]);



    return (
        <canvas ref={canvasRef} width={500} height={650} className="tableCanvas"></canvas>
    );
};

export default TableCanvas;
