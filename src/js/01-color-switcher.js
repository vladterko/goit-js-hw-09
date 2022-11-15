function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const pageBgColor = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);
stopBtn.setAttribute('disabled', '');

let timerId = null;

function onStartBtn () {
    stopBtn.removeAttribute('disabled');
    startBtn.setAttribute('disabled', '');
    timerId = setInterval(() => {
        pageBgColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopBtn () {
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', '');
    clearInterval(timerId);
}
