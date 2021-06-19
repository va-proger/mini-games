const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['F72585', 'B5179E', '7209B7', '560BAD', '480CA8', '3A0CA3', '3F37C9', '4361EE', '4895EF', '4CC9F0']
let time = 0
let score = 0
let antiScore = 0
startBtn.addEventListener('click', (event) =>
{
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event =>{
    if(event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})
board.addEventListener('click', event =>{

    if (event.target.classList.contains('circle')){
        score++

        event.target.remove()
        createRandomCircle()
    }
    else if(event.target === board && time !== 0){
            antiScore++
        }


})

function startGame(){
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}
function decreaseTime(){
    if(time === 0){
    finishGame()
    }else{
    let current = --time
    if(current < 10){
        current = `0${current}`
        }
        setTime(current)
    }
}
function setTime(value){
    timeEl.innerHTML = `00:${value}`
}

function  finishGame(){
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `
    <div class="total">
        <h1>Счет: <span class="primary">${score}</span></h1>
        <h2 class="danger">Мимо: <span class="primary">${antiScore}</span></h2>
    </div>
    
    `
    board.innerHTML += ``
}

function createRandomCircle(){
    const color = getRandomColor()
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.backgroundColor = `#${color}`
    circle.style.boxShadow = `0 0 #2px ${color}, 0 0 10px ${color} `
    circle.style.left = `${x}px`
    board.append(circle)
}
function getRandomNumber(min, max){
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}