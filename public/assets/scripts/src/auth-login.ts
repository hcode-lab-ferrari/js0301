import getFormValues from "./functions/getFormValues";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
const form = document.querySelector<HTMLFormElement>("form#login");

if (form) {

    form.addEventListener("submit", e => {

        e.preventDefault();

        const { email, password } = getFormValues(form);

        signInWithEmailAndPassword(auth, email, password)
            .then(() => location.href = "/")
            .catch((error) => console.error(error.message));

    });

}