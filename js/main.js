"use strict";

const WIDTH_SCREEN = window.innerWidth;
const HEIGHT_SCREEN = window.innerHeight;

let addLastFish = Date.now();
let speed = Date.now();
let arrFish = [];

const getRandomPoint = () => ({
    x: getRandom(0, WIDTH_SCREEN),
    y: getRandom(0, HEIGHT_SCREEN)
})

function addFish() {
    const fish = document.createElement('div');
	if (Date.now() - addLastFish > 3000)
	{
        const point = getRandomPoint();
        fish.className = 'fish';
        fish.style.top = `${point.x}px`;
        fish.style.left = `${point.y}px`;
        arrFish.push(fish);
        arrFish.forEach(item => document.querySelector('.game-zone').appendChild(item));
        addLastFish = Date.now();
    }

    movingFish();
    requestAnimationFrame(addFish);
}

function movingFish() {
    arrFish.forEach(item => {
        let fishTop = item.dataset.yRandom;
        let fishLeft = item.dataset.xRandom;
        let Xpos = item.offsetLeft;
        let Ypos = item.offsetTop;

        const point = getRandomPoint()

        if(Xpos < fishLeft) {
            item.style.transform = 'scale(-1, 1)';
            item.style.left = 1 + Xpos + 'px';
        } else if(Xpos > fishLeft) {
            item.style.transform = 'scale(1, 1)';
            item.style.left = -1 + Xpos + 'px';
        } else {
            item.dataset.xRandom = point.x;
        }

        if(Ypos < fishTop) {
            item.style.top = 1 + Ypos + 'px';
        } else if(Ypos > fishTop) {
            item.style.top = -1 + Ypos + 'px';
        } else {
            item.dataset.yRandom = point.y;
        }
    });
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

document.querySelector('.game-zone').addEventListener('click', function(e) {
    const element = e.target
    if (element.classList.contains('fish')) {
        const indexFish = arrFish.indexOf(element);
        this.removeChild(element);
        arrFish.splice(indexFish, 1);
    }
});

addFish();