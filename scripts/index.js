'use strict'

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext('2d');
    const canvasColor = document.getElementById('canvasColor');
    const canvasRange = document.getElementById('canvasRange');

    const brush = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 2
    };

    const drawArc = () => {
        ctx.beginPath();
        ctx.arc(brush.x, brush.y, brush.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    const setBrushCoords = (eX, eY) => {
        brush.x = eX - canvas.getBoundingClientRect().x - document.documentElement.scrollLeft;
        brush.y = eY - canvas.getBoundingClientRect().y - document.documentElement.scrollTop;
    }

    const setBrush = (e) => {

        if (canvasRange.value < 7) {
            ctx.beginPath();
            ctx.moveTo(brush.x, brush.y);

            setBrushCoords(e.pageX, e.pageY);

            ctx.lineTo(brush.x, brush.y);
            ctx.stroke();
        } else {
            setBrushCoords(e.pageX, e.pageY);
            drawArc();
        }
    }

    const draw = (e) => {
        setBrushCoords(e.pageX, e.pageY);
        if (!(canvasRange.value < 7)) {
            drawArc();
        }
        canvas.addEventListener('mousemove', setBrush);
    }
    const setCanvasRange = () => {
        ctx.lineWidth = canvasRange.value;
        brush.radius = canvasRange.value;
    }
    const setCanvasColor = () => {
        ctx.strokeStyle = canvasColor.value;
        ctx.fillStyle = canvasColor.value;
    }

    setCanvasRange();

    canvas.addEventListener('mousedown', draw);
    document.addEventListener('mouseup', () => canvas.removeEventListener('mousemove', setBrush));
    canvasColor.addEventListener('change', setCanvasColor);
    canvasRange.addEventListener('change', setCanvasRange);
});