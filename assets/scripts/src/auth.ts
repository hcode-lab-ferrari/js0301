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

  const formAuthEmail = document.querySelector("#auth-email");

  formAuthEmail?.addEventListener("submit", (e: any) => {
    e.preventDefault();
    if (e.target) {
      const target: HTMLButtonElement = e.target;
      const btnSubmit = target.querySelector("[type=submit]");
    }
  });
}
