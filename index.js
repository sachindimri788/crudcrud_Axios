const form = document.getElementById('myForm');
document.getElementById('myForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const obj = {
        name,
        email
    };
    axios.post('https://crudcrud.com/api/175cb7d131224bbda5681e0370fa6f9e/appointment', obj)
        .then(response => {
            displayData();
            form.reset();
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
});

function displayData() {
    axios.get('https://crudcrud.com/api/175cb7d131224bbda5681e0370fa6f9e/appointment')
        .then(response => {
            const uList = document.getElementById('uList');
            uList.innerHTML = '';
            const data = response.data;
            if (data !== null) {
                for (let i = 0; i < data.length; i++) {
                    const listItem = document.createElement('li');
                    listItem.textContent = `Name: ${data[i].name}, Email: ${data[i].email}`;
                    uList.appendChild(listItem);

                    let editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.addEventListener('click', function () {
                        editData(i);
                    });

                    let deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', function () {
                        deleteData(index);
                    });
                    listItem.appendChild(editButton);
                    listItem.appendChild(deleteButton);
                }
            }
        })
        .catch(error => {
            console.error(error);
        });

}

displayData();