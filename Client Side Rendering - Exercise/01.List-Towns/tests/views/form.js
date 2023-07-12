import {html} from "../node_modules/lit-html/lit-html.js";

export const formView = (onSubmit) =>
    html`
        <form @submit=${onSubmit} class="content">
            <label for="towns">Towns</label>
            <input id="towns" name="towns" type="text"/>
            <button id="btnLoadTowns">Load</button>
        </form>
        <div id="root">
            <ul></ul>
        </div>`