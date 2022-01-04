// Arquivo para o controle dos formulário de autenticação;

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

  const formAuthEmail = document.querySelector("#auth-email");
  formAuthEmail?.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    if (e.target) {
      const target = e.target as HTMLButtonElement;
      if (target.querySelector("[type=submit]")) {
        const btnSubmit: HTMLButtonElement | null =
          target.querySelector("[type=submit]");
        if (btnSubmit) {
          btnSubmit.disabled = true;

          if (formAuthEmail.querySelector("[type=email]")) {
            const email: HTMLInputElement | null =
              formAuthEmail.querySelector("[type=email]");
            if (email) {
              sessionStorage.setItem("email", email.value);
              location.hash = "#login";
              btnSubmit.disabled = false;
              //button[type=submit]:disabled { background: gray} CSS
            }
          }
        }
      }
    }
  });
}
//ARIA - Acessibilidade
