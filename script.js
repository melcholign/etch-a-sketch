"use strict"

const body = document.querySelector('body');

const gridContainer = makeGridContainer(480, 480);
body.appendChild(gridContainer);

function makeGridContainer(width, height) {
    const gridContainer = document.createElement('div');

    gridContainer.id = 'grid-container';
    gridContainer.style.width = `${width}px`;
    gridContainer.style.height = `${height}px`;

    return gridContainer;
}