import Notiflix from 'notiflix';

const form = document.querySelector('form');
const delay = document.querySelector('input[name = "delay"]');
const step = document.querySelector('input[name = "step"]');
const amount = document.querySelector('input[name = "amount"]');
const btnPromise = document.querySelector('button[type = "submit"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('input', evt => {
  let delayFirst = parseInt(delay.value);
  let stepDelay = parseInt(step.value);
  const amountValue = parseInt(amount.value);
  btnPromise.addEventListener('click', evt => {
    evt.preventDefault();

    for (let i = 1; i <= amountValue; i += 1) {
      createPromise(i, delayFirst)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        })
        .finally(() => console.log('Promise settled')),
        (delayFirst += stepDelay);
    }
  });
});
