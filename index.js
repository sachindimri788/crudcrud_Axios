let id="";
const form = document.getElementById('myForm');
document.getElementById('myForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const obj = {
        name,
        email
    };
    if(id==''){
    axios.post('https://crudcrud.com/api/175cb7d131224bbda5681e0370fa6f9e/appointment', obj)
        .then(response => {
            displayData();
            form.reset();
        
        })
        .catch(error => {
            console.error(error);
        });
    }
    else{
        axios.put(`https://crudcrud.com/api/175cb7d131224bbda5681e0370fa6f9e/appointment/${id}`, obj)
        .then(response=>{
            displayData();
            form.reset();
        })
        id='';
    }
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
                        deleteData(i);
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


function deleteData(i){
    axios.get('https://crudcrud.com/api/175cb7d131224bbda5681e0370fa6f9e/appointment').then(
        response=>{
            const data = response.data;
            if (data !== null) {
                id=data[i]._id;
                axios.delete(`https://crudcrud.com/api/175cb7d131224bbda5681e0370fa6f9e/appointment/${id}`).then(
                    response =>{
                        displayData();
                    }
                )
            }
        }
    )
}

function editData(i){
    axios.get('https://crudcrud.com/api/175cb7d131224bbda5681e0370fa6f9e/appointment').then(
        response=>{
            const data = response.data;
            if (data !== null) {
                document.getElementById('name').value=data[i].name;
                document.getElementById('email').value=data[i].email;
                id=data[i]._id;
            }
        }
    )

}
displayData();