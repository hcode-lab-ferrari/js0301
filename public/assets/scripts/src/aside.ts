const button = document.querySelector("#btn-summary-toggle") as HTMLButtonElement;
const aside = document.querySelector("aside") as HTMLElement;

if (button) {

    button.addEventListener("click", () => aside.classList.toggle("open"));

}