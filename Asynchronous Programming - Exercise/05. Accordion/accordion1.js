async function loadData() {
    const main = document.getElementById('main');

    function fillAccordion(data) {

        const element = ce('div', {className: 'accordion'},
            ce('div', {className: 'head'},
                ce('span', {}, data.title),
                ce('button', {className: 'button', id: data._id, onclick: getDetailsRequests}, 'More')
            ),
            ce('div', {className: 'extra'})
        );
        main.appendChild(element);
    }

    async function getDetailsRequests() {
        const accordionItem = this.parentElement.parentElement;
        if (this.textContent === 'More') {
            const baseUrl = `http://localhost:3030/jsonstore/advanced/articles/details/`;
            const details = await getData(baseUrl + this.id);
            const extraDiv = accordionItem.querySelector('div.extra');
            const content = ce('p',{}, details.content);
            extraDiv.appendChild(content);
            extraDiv.style.display = 'block';
            this.textContent = 'Less'
        } else {
            accordionItem.querySelector('div.extra p').remove();
            this.textContent = 'More'
        }
    }

    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';

    const data = await getData(url);

    data.forEach(fillAccordion)
}

window.addEventListener('load', loadData);

async function getData(url) {
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error: ${response.status} (${response.statusText})`);
    }

    return await response.json();
}

function ce(type, attributes, ...content) {
    const result = document.createElement(type);

    Object.entries(attributes || {})
        .forEach(([attribute, value]) => {
            if (isEventListener(attribute)) {
                result.addEventListener(attribute.substring(2).toLocaleLowerCase(), value);
            } else {
                result[attribute] = value;
            }
        });

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (isElement(e)) {
            result.appendChild(e);
        } else {
            const node = document.createTextNode(e);
            result.appendChild(node);
        }
    });

    return result;

    function isEventListener(attr) {
        return attr.substring(0, 2).localeCompare('on') === 0;
    }

    function isElement(element) {
        return typeof element != 'string' && typeof element != 'number';
    }
}