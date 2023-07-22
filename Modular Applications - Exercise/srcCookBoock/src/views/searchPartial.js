import {html} from "../../node_modules/lit-html/lit-html.js";
import {createSubmitHandler} from "../util.js";

const searchTemplate = (onSearch)=> html`
    <form id="searchForm" @submit = ${onSearch}>
        <input type="text" name="search">
        <input type="submit" value="Search">
    </form>`;

export function searchPartial(ctx){
    return searchTemplate(createSubmitHandler(ctx, onSearch));

}

function onSearch(ctx, data, event) {
    let redirectUrl = data.search === '' ? '/catalog'
        : `/catalog?search=${data.search}`;
    ctx.page.redirect(redirectUrl);
}
