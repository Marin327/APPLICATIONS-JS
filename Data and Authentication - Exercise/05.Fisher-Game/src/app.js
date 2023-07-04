let userData = null;
window.addEventListener('DOMContentLoaded', async () => {
    userData = JSON.parse(sessionStorage.getItem("userData"));

    const catches = document.getElementById('catches');
    catches.innerHTML = '';

    await toggleUserGuest();

    document.getElementById('logout').addEventListener('click', onLogout);
    document.querySelector('.load').addEventListener('click', onLoad);
    document.getElementById('addForm').addEventListener('submit', onAdd);
    catches.addEventListener('click', onCaches);
})

async function toggleUserGuest() {
    const user = document.getElementById('user');
    const guest = document.getElementById('guest');
    const addBtn = document.querySelector('.add');
    const greetingName = document.querySelector('p.email span');

    if (userData) {
        user.style.display = 'inline-block';
        guest.style.display = 'none';
        greetingName.textContent = userData.email;
        addBtn.disabled = false;
        await onLoad();
    } else {
        user.style.display = 'none';
        guest.style.display = 'inline-block';
        greetingName.textContent = 'guest';
        addBtn.disabled = true;
    }
}

async function onLogout() {
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    try {
        const response = await fetch('http://localhost:3030/users/logout', {
            method: "GET", headers: {'X-Authorization': userData.accessToken}
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }

        sessionStorage.removeItem('userData');
        window.location = 'index.html';
    } catch (err) {
        alert(err.message);
    }
}


async function onLoad() {
    try {
        const response = await fetch('http://localhost:3030/data/catches')

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        console.log(data);
        document
            .getElementById('catches')
            .replaceChildren(...data.map(createCatch));
    } catch (err) {
        alert(err.message);
    }
}

function createCatch(data) {
    const isOwner = userData && data._ownerId === userData.id;

    const div = document.createElement('div');
    div.classList.add('catch');
    div.dataset.id = data._id;

    const html = `
	<label>Angler</label>
	<input type="text" class="angler" value="${data.angler}" ${!isOwner ? 'disabled' : ''}>
	<label>Weight</label>
	<input type="text" class="weight" value="${data.weight}" ${!isOwner ? 'disabled' : ''}>
	<label>Species</label>
	<input type="text" class="species" value="${data.species}" ${!isOwner ? 'disabled' : ''}>
	<label>Location</label>
	<input type="text" class="location" value="${data.location}" ${!isOwner ? 'disabled' : ''}>
	<label>Bait</label>
	<input type="text" class="bait" value="${data.bait}" ${!isOwner ? 'disabled' : ''}>
	<label>Capture Time</label>
	<input type="number" class="captureTime" value="${data.captureTime}" ${!isOwner ? 'disabled' : ''}>
	<button class="update" data-id="${data._ownerId}" ${!isOwner ? 'disabled' : ''}>
		Update
	</button>
	<button class="delete" data-id="${data._ownerId}" ${!isOwner ? 'disabled' : ''}>
		Delete
	</button>
`;
    div.innerHTML = html;
    return div;
}

async function onCaches(ev) {
    if (ev.target.tagName !== 'BUTTON') return;
    ev.target.className === 'update' ? await onUpdate(ev) : await onDelete(ev);
}

async function onUpdate(ev) {
    const id = ev.target.parentElement.dataset.id;
    const data = Object.fromEntries(Array.from(ev.target.parentNode.children)
        .filter(el => el.nodeName === 'INPUT')
        .map(el => [el.className, el.value]));

    try {
        if (Object.values(data).some(d => d === '')) {
            throw new Error('Required fields!');
        }
        const response = await fetch('http://localhost:3030/data/catches/' + id, {
            method: 'PUT', headers: {
                'Content-Type': 'application/json', 'X-Authorization': userData.accessToken
            }, body: JSON.stringify(data)
        });
    } catch (err) {
        alert(err.message);
    }
}

async function onDelete(ev) {
    const id = ev.target.parentElement.dataset.id;

    try {
        ev.target.parentElement.remove();
        const response = await fetch('http://localhost:3030/data/catches/' + id, {
            method: 'Delete', headers: {
                'X-Authorization': userData.accessToken
            }
        });
    } catch (err) {
        alert(err.message);
    }
}

async function onAdd(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const {angler, weight, species, location, bait, captureTime} = Object.fromEntries(formData)
    try {
        if (angler === '' || weight === '' || species === '' || location === '' || bait === '' || captureTime === '') {
            throw new Error('Required fields!');
        }
        const response = await fetch('http://localhost:3030/data/catches', {
            method: 'post', headers: {
                'Content-Type': 'application/json', 'X-Authorization': userData.accessToken
            }, body: JSON.stringify({angler, weight, species, location, bait, captureTime})
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        console.log(data);
        document.getElementById('catches').appendChild(createCatch(data));
        Object.values(ev.target)
            .filter(el => el.nodeName === 'INPUT')
            .forEach(el => (el.value = ''));
    } catch (err) {
        alert(err.message);
    }
}