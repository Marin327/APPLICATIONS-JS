
export default function render(html, parent) {
    const template = document.createElement('template');
    // Don't do this at home, use dynamic element creation
    template.innerHTML = html;

    parent.replaceChildren(template.content);
}
