import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {html} from "../../node_modules/lit-html/lit-html.js";
import * as eventsRepo from "../repos/dataRepo.js";
import {createSubmitHandler} from "../utils.js";

const eventTemplate = (event) => html`
    <div class="eventsInfo">
               <div class="eventBoard">
                <div class="event-info">
                    <img src=${event.imageUrl}>
                    <h2>${event.title}</h2>
                    <h6>${event.date}</h6>
                    <a href="/details/${event._id}" class="details-button">Details</a>
                </div>
            </div>`

const profileTemplate = (user, events) => html`
    <section id="profilePage">
        <div class="userInfo">
            <div class="avatar">
                <img src="./images/profilePic.png">
            </div>
            <h2>${user.email}</h2>
        </div>
        <div class="board">
            ${events.length ? repeat(events, e=>e._id, eventTemplate) : html`
                <div class="no-events">
                    <p>This user has no events yet!</p>
                </div>
            `}
        </div>
    </section>
`;

export async function profileView(ctx) {
    const events = await eventsRepo.getAllByUserId(ctx.user._id);
    ctx.render(profileTemplate(ctx.user, events));
}
