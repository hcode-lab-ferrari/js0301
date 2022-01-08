import getFormValues from "./functions/getFormValues";
import { getAuth, confirmPasswordReset, signInWithEmailAndPassword } from "firebase/auth";
import queryStringToJSON from "./functions/queryStringToJSON";

const auth = getAuth();
const form = document.querySelector<HTMLFormElement>("form#reset");

if (form) {

    form.addEventListener("submit", e => {

        e.preventDefault();

        const { password } = getFormValues(form);
        const { oobCode } = queryStringToJSON();

        confirmPasswordReset(auth, oobCode, password)
            .then(() => {
            
                const email = sessionStorage.getItem("email");

                if (email) {

                    signInWithEmailAndPassword(auth, email, password).then(()=> {

                        location.href = "/";

                    }).catch(error => {

                        location.href = "/auth.html#login";

                    });

                } else {

                    location.href = "/auth.html#login";

                }
                
            
            })
            .catch((error) => console.error(error.message));

    });

}