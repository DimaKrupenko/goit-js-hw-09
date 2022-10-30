import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';

const ref = {
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

document.getElementById('start').disabled = true;
let dataValue = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      document.getElementById('start').disabled = true;
      return window.alert('Please choose a date in the future');
    }
    document.getElementById('start').disabled = false;
    dataValue = selectedDates[0] - new Date();
    console.log(selectedDates[0]);
  },
};

const calendar = flatpickr('#datetime-picker', options);

ref.button.addEventListener('click', onStart);

function onStart() {
  ref.days.textContent = 0 + [convertMs(dataValue).days];
  ref.hours.textContent = convertMs(dataValue).hours;
  ref.minutes.textContent = convertMs(dataValue).minutes;
  ref.seconds.textContent = convertMs(dataValue).seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
