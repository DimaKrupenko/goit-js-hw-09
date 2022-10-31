import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

// ref.input.addEventListener('close', () => {
//   options.onClose();
// });

refs.button.disabled = true;

let dataValue = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      refs.button.disabled = true;
      return Notiflix.Notify.warning('Please choose a date in the future');
    }
    refs.button.disabled = false;
    dataValue = selectedDates[0] - new Date();
    console.log(selectedDates[0]);
  },
};

const calendar = flatpickr('#datetime-picker', options);

refs.button.addEventListener('click', onStartId);

function onStartId() {
  const conversion = convertMs(dataValue);

  refs.days.textContent = conversion.days;
  refs.hours.textContent = conversion.hours;
  refs.minutes.textContent = conversion.minutes;
  refs.seconds.textContent = conversion.seconds;

  refs.button.disabled = true;

  const startTime = Date.now();

  if (dataValue == 0) {
    clearTimeout(onStartId);
  }
  setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = currentTime - startTime;
    const timeComponents = convertMs(deltaTime);

    refs.days.textContent = pad(conversion.days - timeComponents.days);
    refs.hours.textContent = pad(conversion.hours - timeComponents.hours);
    refs.minutes.textContent = pad(conversion.minutes - timeComponents.minutes);
    refs.seconds.textContent = pad(conversion.seconds - timeComponents.seconds);
    // console.log(timeComponents);
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
