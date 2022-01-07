export default function appendChild(tagName: string, html: string, target: HTMLElement) {

    const el = document.createElement(tagName);
    el.innerHTML = html;
    target.appendChild(el);
    return el;

}