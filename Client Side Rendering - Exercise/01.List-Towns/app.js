import {render} from "./node_modules/lit-html/lit-html.js";
import {formView} from "./views/form.js";
import {townView} from "./views/town.js";


start();

function start() {
    const body = document.querySelector('body');
    render(formView(onSubmit), body);
}

function onSubmit(event){
    event.preventDefault();
    let formData = new FormData(event.target);
    const towns = formData.get('towns').split(', ');
    render(towns.map(townView), document.querySelector('#root ul'));
}