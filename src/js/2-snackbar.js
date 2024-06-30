import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import Error from "../img/error.svg";
import OK from "../img/OK.svg"


const elements = {
  formRef: document.querySelector('form'),
  inputDelayRef: document.querySelector('input[type="number"]'),
  buttonRef: document.querySelector('button'),
  fieldsetLabels: document.querySelector('fieldset>label'),
  
}


elements.fieldsetLabels.className += 'label-fulfilled';



elements.formRef.addEventListener('submit', onButtonCreat);


function onButtonCreat(evt) {

  evt.preventDefault();

  const promise = new Promise((resolve, reject) => {

    setTimeout(() => {

      if (elements.formRef.elements.state.value === 'fulfilled') {
        resolve(elements.inputDelayRef.value);
      }
      else {
        reject(elements.inputDelayRef.value);
      }
    }, elements.inputDelayRef.value);
  });
    
    promise
        .then((value) => {
          iziToast.show({
       title: 'OK',
         backgroundColor: '#59a10d',
          close: false,
          closeOnClick: true,
          progressBarColor: 'white',
          titleColor: 'white',
          iconUrl: OK,
          position: 'topCenter',
          icon: 'OK.svg',
          messageColor: 'white',
          messageSize: '16px',
    message: `Fulfilled promise in ${elements.inputDelayRef.value}ms`
});
    
})
        .catch((error) => {
     iziToast.show({
         title: 'Error',
         backgroundColor: '#ef4040',
          close: false,
          closeOnClick: true,
          progressBarColor: 'white',
          titleColor: 'white',
          iconUrl: Error,
          position: 'topCenter',
          icon: 'icon-error.svg',
          messageColor: 'white',
          messageSize: '16px',
    message: `Rejected promise in ${elements.inputDelayRef.value}ms`
});
 
})    
}
 
