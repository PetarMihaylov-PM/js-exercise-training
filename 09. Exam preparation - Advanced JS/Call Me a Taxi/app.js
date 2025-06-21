window.addEventListener('load', solve);

function solve() {
  const pickUpLocation = document.getElementById('pick-up-location');
  const dropOffLocation = document.getElementById('drop-off-location');
  const numberOfPpl = document.getElementById('number-of-passengers');
  const dateTime = document.getElementById('date-time');
  const typeOfTaxi = document.getElementById('taxi-type');
  const orderButton = document.getElementById('order-btn');
  const orderInfoList = document.querySelector('.order-info-list');
  const confirmList = document.querySelector('.confirm-order-list');
  const statusHeader = document.getElementById('status');

  orderButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (
      !pickUpLocation.value.trim() ||
      !dropOffLocation.value.trim() ||
      !numberOfPpl.value.trim() ||
      !dateTime.value.trim() ||
      !typeOfTaxi.value.trim()
    ) {
      return;
    }

    const pickUp = pickUpLocation.value.trim();
    const dropOff = dropOffLocation.value.trim();
    const passengers = numberOfPpl.value.trim();
    const time = dateTime.value.trim();
    const taxiType = typeOfTaxi.value.trim();

    
    const li = document.createElement('li');
    li.className = 'order-content';

    const article = document.createElement('article');

    const h1pickUp = document.createElement('h1');
    h1pickUp.textContent = `Pick-up: ${pickUp}`;
    const h1dropOff = document.createElement('h1');
    h1dropOff.textContent = `Drop-off: ${dropOff}`;
    const p1Passengers = document.createElement('p');
    p1Passengers.textContent = `Number of passengers: ${passengers}`;
    const p2Time = document.createElement('p');
    p2Time.textContent = `Date and time: ${time}`;
    const p3taxiType = document.createElement('p');
    p3taxiType.textContent = `Taxi type: ${taxiType}`;

    article.appendChild(h1pickUp);
    article.appendChild(h1dropOff);
    article.appendChild(p1Passengers);
    article.appendChild(p2Time);
    article.appendChild(p3taxiType);

    const div = document.createElement('div');
    div.className = 'btn-wrapper';

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = 'Edit';

    const continueBtn = document.createElement('button');
    continueBtn.className = 'continue-btn';
    continueBtn.textContent = 'Continue';

    div.appendChild(editBtn);
    div.appendChild(continueBtn);

    li.appendChild(article);
    li.appendChild(div);
    orderInfoList.appendChild(li);

  
    pickUpLocation.value = '';
    dropOffLocation.value = '';
    numberOfPpl.value = '';
    dateTime.value = '';
    typeOfTaxi.value = '';
    orderButton.disabled = true;

    editBtn.addEventListener('click', () => {
      pickUpLocation.value = pickUp;
      dropOffLocation.value = dropOff;
      numberOfPpl.value = passengers;
      dateTime.value = time;
      typeOfTaxi.value = taxiType;

      orderInfoList.removeChild(li);
      orderButton.disabled = false;
    });

    continueBtn.addEventListener('click', () => {
      orderInfoList.removeChild(li);

      const confirmLi = document.createElement('li');
      confirmLi.className = 'order-content';

      const confirmArticle = document.createElement('article');
      confirmArticle.innerHTML = article.innerHTML;

      const confirmDiv = document.createElement('div');
      confirmDiv.className = 'btn-wrapper';

      const confirmBtn = document.createElement('button');
      confirmBtn.className = 'confirm-btn';
      confirmBtn.textContent = 'Confirm';

      const cancelBtn = document.createElement('button');
      cancelBtn.className = 'cancel-btn';
      cancelBtn.textContent = 'Cancel';

      confirmDiv.appendChild(confirmBtn);
      confirmDiv.appendChild(cancelBtn);

      confirmLi.appendChild(confirmArticle);
      confirmLi.appendChild(confirmDiv);

      confirmList.appendChild(confirmLi);

      confirmBtn.addEventListener('click', () => {
        confirmList.removeChild(confirmLi);
        orderButton.disabled = false;
        statusHeader.textContent = 'Taxi has been successfully ordered.';
        statusHeader.className = 'taxi-ordered';
      });

      cancelBtn.addEventListener('click', () => {
        confirmList.removeChild(confirmLi);
        orderButton.disabled = false;
        statusHeader.textContent = 'Taxi request was not completed.';
        statusHeader.className = 'taxi-not-complete';
      });
    });
  });

  statusHeader.addEventListener('click', () => {
    location.reload();
  });
}