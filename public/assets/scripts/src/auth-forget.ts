import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();
const form = document.querySelector<HTMLFormElement>("form#forget");

if (form) {
    
    const loading = form.querySelector(".loading-wrap") as HTMLDivElement;
    const message = form.querySelector(".message") as HTMLDivElement;

    form.addEventListener("submit", e => {

        e.preventDefault();

        loading.style.display = "flex";

        const email = sessionStorage.getItem("email");

        if (email) {

            sendPasswordResetEmail(auth, email)
            .then(() => {

                loading.style.display = "none";
                message.style.display = "flex";

            })
            .catch((error) => console.error(error.message));

        }

    });

}