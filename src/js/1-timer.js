
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import error from '../img/error.svg'


const inputDatetimeRef = document.querySelector('#datetime-picker');
const buttonStartRef = document.querySelector('button');
const divTimerRef = document.querySelector('.timer');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

const div = document.createElement('div');
div.className += 'container';
div.appendChild(inputDatetimeRef);
div.appendChild(buttonStartRef);
div.appendChild(divTimerRef)
const sectionRef = document.querySelector('section');
sectionRef.insertAdjacentElement('afterend', div);

buttonStartRef.addEventListener('click', onButtonStartTimer);

buttonStartRef.disabled = true;

let userSelectedDate;
let timerId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  onClose(selectedDates) {
    
      if (selectedDates[0].getTime() > Date.now()) { 
        buttonStartRef.disabled = false; 
        userSelectedDate = selectedDates[0].getTime();
          
      } else {
        iziToast.show({
          backgroundColor: '#ef4040',
          close: false,
          closeOnClick: true,
          progressBarColor: 'white',
          title: 'Error',
          titleColor: 'white',
          iconUrl: error,
          position: 'topCenter',
          icon: 'icon-error.svg',
          messageColor: 'white',
          messageSize: '16px',
    message: 'Please choose a date in the future'
});
        
        buttonStartRef.disabled = true;      
      }
      
  },
};
flatpickr(inputDatetimeRef, options);

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}



function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function onButtonStartTimer() {

  buttonStartRef.disabled = true;
  inputDatetimeRef.disabled = true;

  timerId = setInterval(() => {
    const result = userSelectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(result);

    timerDays.textContent = addLeadingZero(days);
    timerHours.textContent = addLeadingZero(hours);
    timerMinutes.textContent = addLeadingZero(minutes);
    timerSeconds.textContent = addLeadingZero(seconds);

    if (result < 1000) {
      clearInterval(timerId);
      inputDatetimeRef.disabled = false;
    }
    }, 1000)      
         
     }








