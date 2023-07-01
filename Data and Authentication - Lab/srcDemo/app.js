document.getElementById('refreshBtn').addEventListener('click', getData);
document.getElementById('createBtn').addEventListener('click', postData);
let input = document.getElementById('product');
let list = document.getElementById('list');

const baseUrl = 'http://localhost:3030/jsonstore/demo';

async function getData() {
    const response = await fetch(baseUrl);
    const data = await response.json();

    list.replaceChildren(...Object.values(data).map(createListItem))
}

async function postData() {
    const product = input.value;
    const data = {
        name: product
    };

    const response = await fetch(baseUrl, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    const responseData = await response.json();
    list.appendChild(createListItem(responseData));
    input.value = '';
}

function createListItem(responseData) {
    let row = document.createElement('li');
    row.textContent = responseData.name;

    let button = document.createElement('button');
    button.textContent = 'Delete';
    button.addEventListener('click', () => deleteHandler(responseData._id, row))
    row.appendChild(button)
    return row;
}

async function deleteHandler(id, element) {
    const response = await fetch(baseUrl + '/' + id, {method: 'delete'});
    element.remove();
}