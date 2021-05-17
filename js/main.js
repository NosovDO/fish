"use strict";

let addLastFish = Date.now();
let speed = Date.now();
let arrFish = [];

function addFish() {
    const fish = document.createElement('div');
	if (Date.now() - addLastFish > 3000)
	{
        fish.className = 'fish';
        fish.dataset.xRandom = getRandom(0, 1720);
        fish.dataset.yRandom = getRandom(0, 800);
        fish.style.top = getRandom(0, 800) + 'px';
        fish.style.left = getRandom(0, 1720) + 'px';
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

        if(Xpos < fishLeft) {
            item.style.transform = 'scale(-1, 1)';
            item.style.left = 1 + Xpos + 'px';
        } else if(Xpos > fishLeft) {
            item.style.transform = 'scale(1, 1)';
            item.style.left = -1 + Xpos + 'px';
        } else {
            item.dataset.xRandom = getRandom(0, 1720);
        }

        if(Ypos < fishTop) {
            item.style.top = 1 + Ypos + 'px';
        } else if(Ypos > fishTop) {
            item.style.top = -1 + Ypos + 'px';
        } else {
            item.dataset.yRandom = getRandom(0, 800);
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