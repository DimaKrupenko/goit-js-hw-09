import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';

const ref = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
};

// ref.input.addEventListener('close', () => {
//   options.onClose();
// });

document.getElementById('start').disabled = true;

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
    console.log(selectedDates[0]);
  },
};

const calendar = flatpickr('#datetime-picker', options);

ref.button.addEventListener('click', onStart);

function onStart(evt) {
  console.log(evt);
}
