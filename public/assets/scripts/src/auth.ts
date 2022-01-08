// Arquivo para o controle dos formulário de autenticação;

import queryStringToJSON from "./functions/queryStringToJSON";

const authPage = document.querySelector("main#auth");

if (authPage) {
  const hideAuthForms = () => {
    document
      .querySelectorAll("#auth form")
      .forEach((el) => el.classList.add("hide"));
  };

  const showAuthForm = (id: string) => {
    document.getElementById(id)?.classList.remove("hide");
  };

  const authHash = () => {
    hideAuthForms();

    if (sessionStorage.getItem("email")) {
      const emails = [
        ...document.querySelectorAll<HTMLInputElement>("[name=email]"),
      ];
      emails.forEach((el: HTMLInputElement) => {
        if (el) {
          el.value = sessionStorage.getItem("email") ?? "";
        }
      });
    }

    const queryString = queryStringToJSON();

    if (queryString.mode && queryString.mode === "resetPassword") {

      location.hash = "#reset";
      showAuthForm("reset");

    } else {
      switch (window.location.hash) {
        case "#register":
          showAuthForm("register");
          break;
        case "#login":
          showAuthForm("login");
          break;
        case "#forget":
          showAuthForm("forget");
          break;
        case "#reset":
          showAuthForm("reset");
          break;
        default:
          showAuthForm("auth-email");
      }
    }
  };

  //init.
  window.addEventListener("load", (e) => {
    //o site carregou.
    authHash();
  });
  window.addEventListener("hashchange", (e) => {
    //o site carregou.
    authHash();
  });

  const formAuthEmail = document.querySelector("#auth-email") as HTMLFormElement;

  formAuthEmail.addEventListener("submit", (e: Event) => {

    e.preventDefault();

    try {
      const form = e.target as HTMLFormElement;
      const button = form.querySelector("[type=submit]") as HTMLButtonElement;
      const {value} = form.querySelector("[type=email]") as HTMLInputElement;

      button.disabled = true;
      sessionStorage.setItem("email", value);
      location.hash = "#login";
      button.disabled = false;
    } catch (e) {
      console.warn(`Houve um problema no envio do formulário.`);
    }
          
  });

}
//ARIA - Acessibilidade
