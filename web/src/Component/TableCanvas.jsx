import React, { useEffect, useRef } from 'react';

const TableCanvas = () => {
    const data = {

    }
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const day = ["", "월", "화", "수", "목", "금"];

        // 캔버스 초기화
        context.clearRect(0, 0, canvas.width, canvas.height);

        // 표 그리기
        const cellWidth = canvas.width / day.length;
        const cellHeight = 30;
        const padding = 5;
        const startX = 0;
        const startY = 0;

        context.strokeRect(startX, startY, canvas.width, canvas.height);

        // 월 화 수 목 금 타이틀 그리기
        context.font = 'bold 12px Arial';
        context.textAlign = 'center';
        for (let i = 0; i < day.length; i++) {
            context.fillText(day[i], startX + cellWidth / 2 + cellWidth * i, startY);
            context.strokeRect(startX + cellWidth * i, startY, cellWidth, cellHeight);
        }

        // 데이터 그리기
        context.font = '12px Arial';
        for (let i = 0; i < data.length; i++) {
            const x = startX;
            const y = startY + (i + 1) * cellHeight;

            context.fillText(data[i], x, y);

            // 왼쪽 border 그리기
            context.beginPath();
            context.moveTo(x, y - cellHeight + padding);
            context.lineTo(x, y + padding);
            context.stroke();
        }

        // 상단 border 그리기
        context.beginPath();
        context.moveTo(startX, startY + padding);
        context.lineTo(startX + cellWidth * 5, startY + padding);
        context.stroke();
    }, [data]);

    return (
        <canvas ref={canvasRef} width={500} height={600} className="tableCanvas"></canvas>
    );
};

export default TableCanvas;
