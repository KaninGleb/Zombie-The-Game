let randomIndex;
let hit = true
let isStarted = false
let interval;

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length)
}

const items = document.querySelectorAll(".item")
const missCounter = document.getElementById("miss-counter")

const zombieImg = document.createElement("img")
zombieImg.src = "images/zombie.png"

const bu = document.getElementById("sound-bu")
bu.volume = 0.03;

const soundBtn = document.getElementById("sound-btn")

const startBtn = document.getElementById("start-btn")

const hitImg = document.createElement("img")
hitImg.src = "images/blood.png"

const shot = document.getElementById("sound-shot")
shot.volume = 0.03;

const hitCounter = document.getElementById("hit-counter")

soundBtn.onclick = function () {
    if (bu.currentTime) {
        bu.pause()
        bu.currentTime = 0
        soundBtn.innerHTML = "SOUND ON"
    } else {
        bu.play()
        soundBtn.innerHTML = "SOUND OFF"
    }
}

zombieImg.onclick = function () {
    hit = true
    shot.currentTime = 0
    shot.play()

    zombieImg.remove()
    items[randomIndex].append(hitImg)

    hitCounter.innerText++
}

startBtn.onclick = function () {
    if (!isStarted) {
        // запустить
        isStarted = true
        playGame()
        startBtn.innerText = "STOP"

    } else {
        // остановить
        isStarted = false
        clearInterval(interval)
        startBtn.innerText = "START"
        hitCounter.innerText = 0
        missCounter.innerText = 0
        zombieImg.remove()
        hitImg.remove()
    }
}

let canShoot = true; // Переменная для отслеживания возможности выстрела

items.forEach(item => {
    item.onclick = () => {
        if (!canShoot) return; // Если выстрелить нельзя, выходим из функции

        shot.currentTime = 0; // Сбрасываем время
        shot.play(); // Играем звук выстрела
        canShoot = false; // Запрещаем дальнейшие выстрелы

        if (item === items[randomIndex]) {
            // Если кликнули на зомби, ничего не делаем
            hit = true;
            return;
        }

        // Если кликнули не на зомби, увеличиваем счетчик пропусков
        missCounter.innerText++;

        // Устанавливаем задержку перед тем, как разрешить следующий выстрел
        setTimeout(() => {
            canShoot = true; // Разрешаем выстрелы снова
        }, 1000);
    };
});

//game
function playGame() {
    randomIndex = getRandomIndex(items)
    items[randomIndex].append(zombieImg)

    interval = setInterval(function () {
        if (hit) {
            hit = false
        } else {
            missCounter.innerText++
        }
        randomIndex = getRandomIndex(items)
        items[randomIndex].append(zombieImg)
        hitImg.remove()
    }, 1500)
}