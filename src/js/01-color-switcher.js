function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const ref = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

ref.start.addEventListener('click', onStart);
ref.stop.addEventListener('click', onStop);

let startId;
let isActive = false;
function onStart(evt) {
  if (isActive) {
    return;
  }
  isActive = true;

  startId = setInterval(() => {
    ref.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStop() {
  clearInterval(startId);
  isActive = false;
}
