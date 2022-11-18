import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    dateInput: document.querySelector('#datetime-picker'),
    startTimerBtn: document.querySelector('button[data-start]'),
    valueDays: document.querySelector('span[data-days]'),
    valueHours: document.querySelector('span[data-hours]'),
    valueMinutes: document.querySelector('span[data-minutes]'),
    valueSeconds: document.querySelector('span[data-seconds]'),
}

refs.startTimerBtn.addEventListener('click', onStartTimerBtn);
refs.startTimerBtn.setAttribute('disabled', '');

let setedDate = [];
const fpOptions = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        setedDate = selectedDates[0];
        if (setedDate.getTime() <= fpOptions.defaultDate.getTime()) {
             Notiflix.Notify.failure('Please choose a date in the future');
         
        } else {
            refs.startTimerBtn.removeAttribute('disabled', '');
        } 
    },
}

flatpickr(refs.dateInput, fpOptions);

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

function onStartTimerBtn() {
    refs.startTimerBtn.setAttribute('disabled', '');
    let ms = setedDate.getTime() - fpOptions.defaultDate.getTime();
    const timerId = setInterval(() => {
        ms = ms - 1000;
        const timer = convertMs(ms);
        refs.valueDays.textContent = timer.days.toString().padStart(2,'0');
        refs.valueHours.textContent = timer.hours.toString().padStart(2,'0');
        refs.valueMinutes.textContent = timer.minutes.toString().padStart(2,'0');
        refs.valueSeconds.textContent = timer.seconds.toString().padStart(2,'0');
        if (ms < 1000) {
            clearInterval(timerId);
            Notiflix.Notify.success('Timer is off');
        }
    }, 1000);
}
