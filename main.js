var gElCanvas;
var gCtx;
var gCurrShape = 'triangle';
var gStartOffsetX;
var gStartOffsetY;

function init() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
}

function drawLine(x, y, xEnd, yEnd) {
    gCtx.beginPath();
    gCtx.moveTo(x, y);
    gCtx.lineTo(xEnd, yEnd);
    gCtx.closePath();
    gCtx.strokeStyle = document.querySelector('#stroke-color').value;
    gCtx.stroke();
}

function drawTriangle(x, y, altX, altY) { 
    gCtx.beginPath();
    gCtx.moveTo(x, y);
    gCtx.lineTo(getRandomInt(Math.min(x, altX) - 60, Math.max(x, altX) + 60),
                getRandomInt(Math.min(y, altY) - 60, Math.max(y, altY) + 60));
    gCtx.lineTo(altX, altY);
    gCtx.closePath();
    gCtx.fillStyle = document.querySelector('#inside-color').value;
    gCtx.fill();
    gCtx.strokeStyle = document.querySelector('#stroke-color').value;
    gCtx.stroke();
}

function drawRect(x, y, altX, altY) {
    gCtx.beginPath();
    gCtx.rect(x, y, altX - x, altY - y);
    gCtx.fillStyle = document.querySelector('#inside-color').value;
    gCtx.fillRect(x, y, altX - x, altY - y);
    gCtx.strokeStyle = document.querySelector('#stroke-color').value;
    gCtx.stroke();
}

function drawCircle(x, y, altX, altY) {
    gCtx.beginPath();
    gCtx.arc(x, y, Math.max(Math.abs(x - altX), Math.abs(y - altY)), 0, 2 * Math.PI);
    gCtx.fillStyle = document.querySelector('#inside-color').value;
    gCtx.fill();
    gCtx.strokeStyle = document.querySelector('#stroke-color').value;
    gCtx.stroke();
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function setShape(ev) {
    gCurrShape = ev.value;
}

function startDraw(ev) {
    gStartOffsetX = ev.offsetX;
    gStartOffsetY = ev.offsetY;
}

function startDrawTouch(ev) {
    gStartOffsetX = ev.touches[0].clientX;
    gStartOffsetY = ev.touches[0].clientY;
}

function draw(ev) {
    const offsetX = ev.offsetX;
    const offsetY = ev.offsetY;
    switch (gCurrShape) {
        case 'triangle':
            drawTriangle(offsetX, offsetY, gStartOffsetX, gStartOffsetY);
            break;
        case 'rect':
            drawRect(offsetX, offsetY, gStartOffsetX, gStartOffsetY);
            break;
        case 'circle':
            drawCircle(offsetX, offsetY, gStartOffsetX, gStartOffsetY);
            break;
        case 'line':
            drawLine(gStartOffsetX, gStartOffsetY, offsetX, offsetY);
            break;
    }
}

function drawTouch(ev) {
    const offsetX = ev.touches[0].clientX;
    const offsetY = ev.touches[0].clientY;
    switch (gCurrShape) {
        case 'triangle':
            drawTriangle(offsetX, offsetY, gStartOffsetX, gStartOffsetY);
            break;
        case 'rect':
            drawRect(offsetX, offsetY, gStartOffsetX, gStartOffsetY);
            break;
        case 'circle':
            drawCircle(offsetX, offsetY, gStartOffsetX, gStartOffsetY);
            break;
        case 'line':
            drawLine(gStartOffsetX, gStartOffsetY, offsetX, offsetY);
            break;
    }
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-img.jpg';
}

function getRandomInt(min, max) {
    return Math.random() * (max - min + 1) + min;
  }