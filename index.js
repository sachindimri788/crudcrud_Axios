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
            displayData(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
});

function displayData(data) {
    const uList = document.getElementById('uList');
    if (Array.isArray(data)) {
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `Name: ${item.name}, Email: ${item.email}`;
            uList.appendChild(listItem);
        });
    } else if (typeof data === 'object') {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const listItem = document.createElement('li');
                listItem.textContent = `${key}: ${data[key]}`;
                uList.appendChild(listItem);
            }
        }
    }
}

