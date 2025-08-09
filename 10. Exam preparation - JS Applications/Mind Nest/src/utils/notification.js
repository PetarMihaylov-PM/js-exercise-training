
const box = document.getElementById('errorBox');
const span = box.querySelector('.msg');

export function showError(msg) { 
  span.textContent = msg;

  box.style.display = 'block';

  setTimeout(hide, 3000);
 }

 function hide() {
  box.style.display = 'none';
 }