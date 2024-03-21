import React, { useEffect, useRef } from 'react';

import output from "../data/output.json";
import {koreatech, pastelArray} from "../style/color";
pastelArray.sort(() => Math.random() - 0.5);

const TableCanvas = (props) => {
    const {selectedRow, setSelectedRow, selectedRowList, setSelectedRowList} = props;
    const canvasRef = useRef(null);
    const nodes = output;


    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // 캔버스 크기를 부모 요소에 맞게 조정
        const {w, h} = canvas.getBoundingClientRect();
        canvas.width = 500;
        canvas.height = 650;

        // 레티나 디스플레이를 고려하여 캔버스의 해상도를 조정
        const scale = window.devicePixelRatio;
        canvas.width *= scale;
        canvas.height *= scale;
        context.scale(scale, scale);

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

        //캔버스 초기화
        context.lineWidth = defaultLineWidth;
        context.clearRect(0, 0, canvas.width /scale, canvas.height / scale)
        context.fillStyle = "white"
        context.fillRect(0, 0, canvas.width / scale, canvas.height / scale);


        // 표 그리기
        const cellWidth = canvas.width / day.length / scale;
        const cellHeight = 30;
        const startX = 0;
        const startY = 0;

        //영역표시
        context.strokeRect(startX, startY, canvas.width / scale, canvas.height / scale);

        // 월 화 수 목 금 타이틀 그리기
        context.fillStyle = "black";
        context.font = "15px sans-serif";
        context.textAlign = "center";
        for (let i = 0; i < day.length; i++) {
            context.strokeRect(startX + cellWidth * i, startY, cellWidth, cellHeight);
            context.fillText(day[i], startX + cellWidth / 2 + cellWidth * i, startY + cellHeight / 2 + 5);
        }
        for (let i = 0; i < 18; i++) {
            for (let j = 0; j < 6; j++) {
                context.strokeRect(startX + cellWidth * j, startY + cellHeight * (i + 1), cellWidth, cellHeight);
            }
        }
        // 시간 표시
        for (let i = 0; i < 18; i++) {
            context.font = "13px sans-serif"
            context.fillText(timeTitle[i], startX + cellWidth / 2, startY + cellHeight * (i + 2) - 10);
        }
        /*
         * 선택된 리스트 표시
         */
        for (let i = 0; i < selectedRowList.length; i++) {
            const boxColor = pastelArray[i];
            context.lineWidth = 0;
            const times = selectedRowList[i].time;
            for (let j = 0; j < times.length; j++) {
                context.fillStyle = boxColor;
                const time = times[j];
                const d = day.indexOf(time.charAt(0));
                const startT = Number(time.substring(1, 3));
                const startTA = time.substring(3, 4);
                const endT = Number(time.substring(5, 7));
                const endTA = time.substring(7, 8);

                const startBoxX = startX + cellWidth * d;
                const startBoxY = startY + cellHeight * (1 + (startT - 1) * 2 + (startTA === 'A' ? 0 : 1));
                const width = cellWidth;
                const height = 2 * cellHeight * (endT + (endTA === 'A' ? 0 : 1) - (startT + ( startTA === 'A' ? 0 : 1)));
                context.fillRect(startBoxX, startBoxY, width, height);
                context.fillStyle = "black";
                fillTextInBox(
                    context,
                    selectedRowList[i].title + '\n' + selectedRowList[i].part + " " + selectedRowList[i].prof,
                    startBoxX,
                    startBoxY + 15,
                    cellWidth,
                    4
                );
            }
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
                    context.lineWidth = 6;
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
    }, [selectedRow, selectedRowList]);

    const fillTextInBox = (context, text, x, y, width, padding) => {
        context.fillStyle = "black";
        context.textAlign = "left";
        context.font = '12px sans-serif'
        const lines = text.split('\n');
        let lineCount = 0;
        let buf = "";
        for (let k = 0; k < lines.length; k++) {
            const line = lines[k];
            for (let i = 0; i < line.length; i++) {
                const char = line.charAt(i);
                if (context.measureText(buf + char).width < width - padding) {
                    buf += char
                } else {
                    context.fillText(buf, x + padding, y + 20 * lineCount++)
                    buf = char;
                }
            }
            if (buf.length > 0) {
                context.fillText(buf, x + padding, y + 20 * lineCount++);
                buf = "";
            }
        }
    }


    return (
        <canvas ref={canvasRef} className="tableCanvas"></canvas>
    );
};

export default TableCanvas;
