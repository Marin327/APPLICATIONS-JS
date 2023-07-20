export function createSubmitHandler(ctx, handler) {
    return function (event) {
        event.preventDefault()
        const formData = {};
        for (const prop of new FormData(event.target).entries()) {
            formData[prop[0]] = prop[1].trim();
        }

        handler(ctx, formData, event)
    }
}
