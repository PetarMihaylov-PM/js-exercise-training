window.addEventListener('load', solve);


function solve() {


    const button = document.getElementById('next-btn');
    button.addEventListener('click', handleClick);


    function handleClick (e) { 
        e.preventDefault();
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const fromDate = document.getElementById('from-date').value;
        const toDate = document.getElementById('to-date').value;
        

        if(!firstName || !lastName || !fromDate || !toDate || fromDate >= toDate){
            return;
        }

        const infoList = document.querySelector('.info-list');

        const li = document.createElement('li');
        li.className = 'vacation-content';

        const article = document.createElement('article');

        const h3 = document.createElement('h3');
        h3.textContent = `Name: ${firstName} ${lastName}`;

        const p1 = document.createElement('p');
        p1.textContent = `From date: ${fromDate}`;

        const p2 = document.createElement('p');
        p2.textContent = `To date: ${toDate}`;

        article.appendChild(h3);
        article.appendChild(p1);
        article.appendChild(p2);

        const editButton = document.createElement('button');
        editButton.className = 'edit-btn';
        editButton.textContent = 'Edit';

        const continueButton = document.createElement('button');
        continueButton.className = 'continue-btn';
        continueButton.textContent = 'Continue';

        li.appendChild(article);
        li.appendChild(editButton);
        li.appendChild(continueButton);

        infoList.appendChild(li);

        document.getElementById('first-name').value = '';
        document.getElementById('last-name').value = '';
        document.getElementById('from-date').value = '';
        document.getElementById('to-date').value = '';

        button.disabled = true;

        /* edit button event */
        editButton.addEventListener('click', handleClear);

        function handleClear() {
            infoList.removeChild(li);
            button.disabled = false;

            document.getElementById('first-name').value = firstName;
            document.getElementById('last-name').value = lastName;
            document.getElementById('from-date').value = fromDate;
            document.getElementById('to-date').value = toDate;
        }
        /* ------------------------------------------------------- */

        /* continue button event */
        const confirmList = document.querySelector('.confirm-list');
        continueButton.addEventListener('click', handleContinue);
        
        const confirmButton = document.createElement('button');
        confirmButton.className = 'confirm-btn';
        confirmButton.textContent = "Confirm";

        const cancelButton = document.createElement('button');
        cancelButton.className = 'cancel-btn';
        cancelButton.textContent = "Cancel";

        function handleContinue () {
            infoList.removeChild(li);
            li.removeChild(editButton);
            li.removeChild(continueButton);

            li.appendChild(confirmButton);
            li.appendChild(cancelButton)

            confirmList.appendChild(li);
        }
        /* ------------------------------------------------------- */


        /* Confrim button event */
        confirmButton.addEventListener('click', handleConfirm);
        const h1 = document.getElementById('status');


        function handleConfirm() {
            confirmList.removeChild(li);
            button.disabled = false;
            h1.className = 'vacation-confirmed';
            h1.textContent = 'Vacation Requested';
        }
        /* ------------------------------------------------------- */

        /* Cancel button event */
        cancelButton.addEventListener('click', handleCancel);

        function handleCancel() {
            confirmList.removeChild(li);
            button.disabled = false;
            h1.className = 'vacation-cancelled';
            h1.textContent = 'Cancelled Vacation';
        }
        /* ------------------------------------------------------- */

        h1.addEventListener('click', ()=> {
            location.reload();
        })
    }
}


    
    
