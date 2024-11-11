const container = document.querySelector('.container');
const grid = document.querySelector('#grid');
const sideBar = document.querySelector('.side-bar');
const slider = document.querySelector('#myRange');
const range = document.querySelector('#rangeValue');
const colorcontainer = document.querySelector('.colorcontainer');

range.textContent = `${slider.value} x ${slider.value}`;

slider.oninput = () => {
    range.textContent = `${slider.value} x ${slider.value}`;
    gridSize(slider.value);
};

const colors = ['black', 'red', 'blue', 'green', 'yellow', 'cyan'];
for (let i = 0; i < 6; i++){
    const color = document.createElement('div');
    color.setAttribute('class', 'color');
    color.style.width = '30px';
    color.style.height = '30px';
    color.style.backgroundColor = colors[i];
    colorcontainer.appendChild(color);
}

let selectedColor = 'black';

function gridSize(size){
    container.innerHTML = '';
    let boxSize = 650 / size;
    
    for (let i = 0; i < size; i++){
        const row = document.createElement('div');
        row.setAttribute('class', 'row');
    
        for (let j = 0; j < size; j++){
            const cell = document.createElement('div');
            cell.setAttribute('class', 'cell');
            cell.style.width = `${boxSize}px`;
            cell.style.height = `${boxSize}px`;
            row.appendChild(cell);
        }

        container.appendChild(row);
    }
    draw();
}

function draw(){
    const colorBoxes = document.querySelectorAll('.color');

    colorBoxes.forEach(color => {
        color.addEventListener('click', () => {
            selectedColor = color.style.backgroundColor;
        })
    })

    const cells = document.querySelectorAll('.cell');
    let isHold = false;

    cells.forEach(cell => {
        cell.addEventListener('mousedown', (event) => {
            if (event.buttons === 1){
                isHold = true;
                colorCell(cell);
                event.preventDefault();
            }
        });
    
        cell.addEventListener('mouseenter', () => {
            if (isHold) {
                colorCell(cell);
            }
        });
    });

    document.addEventListener('mouseup', () => {
        isHold = false;
    });
}

function colorCell(cell) {
    if (cell.style.backgroundColor !== selectedColor) {
        cell.style.opacity = 0.1;
    }

    let currentOpacity = parseFloat(cell.style.opacity) || 0;

    if (currentOpacity < 1) {
        currentOpacity = Math.min(currentOpacity + 0.2, 1);
    }

    cell.style.backgroundColor = selectedColor;
    cell.style.opacity = currentOpacity;
}

gridSize(slider.value);
