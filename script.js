"use strict"

let drawing = false;

initializeBody(makeGridInputButton, makeGridContainer);

function initializeBody(makeGridInputButton, makeGridContainer) {
    const body = document.querySelector('body');
    body.className = 'column-center';
    const gridContainer = makeGridContainer(540, 540);
    fillWithGridSquares(gridContainer, 50);
    const gridInputButton = makeGridInputButton(gridContainer);
    body.appendChild(gridInputButton);
    body.appendChild(gridContainer);

    return body;
}

function removeGrids(gridContainer) {

    const gridSquares = gridContainer.childNodes;
    while (gridSquares.length) {
        gridContainer.removeChild(gridSquares[0]);
    }
}

function getGridInput() {

    while (true) {

        let gridInput = prompt("Enter the no. of squares (max: 100) per side of the grid: ");
        if (gridInput === null) return null;

        gridInput = +gridInput;

        if (isNaN(gridInput) || !Number.isInteger(gridInput) || gridInput < 0) {
            alert('Invalid input');
        } else if (gridInput > 100) {
            alert('Accepted input value cannot be greater than 100');
        } else {
            return gridInput;
        }
    }
}

function makeGridInputButton(gridContainer) {
    const inputButton = document.createElement('button');

    inputButton.id = 'input-button';
    inputButton.textContent = 'Change No. of Squares Per Side';

    inputButton.addEventListener('click', () => {
        const gridInput = getGridInput();
        if (gridInput !== null) {
            removeGrids(gridContainer);
            fillWithGridSquares(gridContainer, gridInput);
        }
    });

    return inputButton;
}

function addDrawingEffect(gridSquare) {

    let filled = 0;
    let mouseDown = false;

    gridSquare.addEventListener('mousedown', () => {
        drawing = true;
        colorGridSquare(gridSquare, 25.5, ++filled)
    });

    gridSquare.addEventListener('mouseup', () => drawing = false);
    gridSquare.addEventListener('dragstart', () => drawing = false);

    gridSquare.addEventListener('mouseenter', () => {
        if (drawing) {
            colorGridSquare(gridSquare, 25.5, ++filled)
        } else {
            gridSquare.style.backgroundColor = '#acacac';
        }
    });

    gridSquare.addEventListener('mouseleave', () => {
        if (!filled) gridSquare.style.backgroundColor = '';
    });
}

function colorGridSquare(gridSquare, decrementValue, decrementMultiplier) {
    let actualValue = decrementValue * decrementMultiplier;
    if (actualValue > 255) actualValue = 255;
    gridSquare.style.backgroundColor = `rgb(${255 - actualValue}, ${255 - actualValue}, ${255 - actualValue})`;
}

function fillWithGridSquares(gridContainer, gridsPerSide) {

    const gridSize = parseFloat(gridContainer.style.width) / gridsPerSide;

    for (let i = 1; i <= gridsPerSide; ++i) {

        for (let j = 1; j <= gridsPerSide; ++j) {

            const gridSquare = makeGridSquare(gridSize);
            addDrawingEffect(gridSquare);
            gridContainer.appendChild(gridSquare);
        }
    }
}

function makeGridSquare(gridSize) {
    const GridSquare = document.createElement('div');

    GridSquare.className = 'grid-square';
    GridSquare.style.width = `${gridSize}px`;
    GridSquare.style.height = `${gridSize}px`;

    return GridSquare;
}

function makeGridContainer(width, height) {
    const gridContainer = document.createElement('div');

    gridContainer.id = 'grid-container';
    gridContainer.className = 'column-center';
    gridContainer.style.width = `${width}px`;
    gridContainer.style.height = `${height}px`;

    return gridContainer;
}

