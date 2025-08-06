export function getUserData() {
  return JSON.parse(sessionStorage.getItem('userData'));
}

export function setUserData(data) {
  return sessionStorage.setItem('userData', JSON.stringify(data));
}

export function clearUserData() {
  return sessionStorage.removeItem('userData');
}

export function updateNav(){

  const userData = getUserData();

  document.querySelector('.user').style.display = userData ? '' : 'none';
  document.querySelector('.guest').style.display = userData ? 'none' : '';
}
