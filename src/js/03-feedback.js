import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input[name=email]'),
  message: document.querySelector('.feedback-form textarea[name=message]'),
};

const STORAGE_KEY = 'feedback-form-state';

const savedData = localStorage.getItem(STORAGE_KEY);
const parsedSavedData = JSON.parse(savedData);

let formData = { email: '', message: '' };

if (parsedSavedData) {
  refs.email.value = parsedSavedData.email;
  refs.message.value = parsedSavedData.message;

  formData.email = refs.email.value;
  formData.message = refs.message.value;
}

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextInput, 500));

function onTextInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  console.log('Object of form data -', formData);
  e.currentTarget.reset();
  formData = { email: '', message: '' };  // reset all object properties
}
