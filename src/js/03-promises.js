import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmitBtn);

function onFormSubmitBtn(evt) {
  evt.preventDefault();
  let delay = Number(evt.target.delay.value);
  const step = Number(evt.target.step.value);
  const amount = Number(evt.target.amount.value);
  let position = 0;
  const stepId = setInterval(() => {
    position += 1;
    createPromise(position, delay).then(onResolve).catch(onReject);
    delay = delay + step;
    if (position === amount) {
        clearInterval(stepId);
    }
  }, step);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay })
      } else {
        // Reject
        reject({ position, delay })
      }
    }, delay);
  });
}

function onResolve({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onReject({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
