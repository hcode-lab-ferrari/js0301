const body = document.querySelector("body");

const btnOpen = document.getElementById("btn-open");
//const closeMenu = document.getElementById("btn-close");

const closeMenu = document.querySelectorAll('[data-close="menu"]');
// const btnOpen = document.querySelector("#btn-open");
const menuLinks = document.querySelectorAll(".menu a");

if (body) {

  if (btnOpen) {
    btnOpen.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      body.classList.add("open-menu");
    });
  }

  if (closeMenu) {
    closeMenu.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        body.classList.remove("open-menu");
      });
    });
  }

  if (menuLinks) {
    menuLinks.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        body.classList.remove("open-menu");
      });
    });
  }

}
//SOLID - Single Responsibility Principle
