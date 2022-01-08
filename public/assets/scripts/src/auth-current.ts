import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";

const auth = getAuth();
const button = document.querySelector("#header > div.menu > div > a") as HTMLButtonElement;
const profile = document.querySelector("#header > div.menu > div > div") as HTMLDivElement;

if (profile) {

    const userName = profile.querySelector("strong") as HTMLElement;
    const userEmail = profile.querySelector("small") as HTMLElement;
    const userPhoto = profile.querySelector("img") as HTMLImageElement;
    const buttonLogout = profile.querySelector("button") as HTMLButtonElement;

    buttonLogout.addEventListener("click", () => {

        signOut(auth);

    });

    onAuthStateChanged(auth, () => {

        if (auth.currentUser) {

            button.style.display = "none";
            profile.style.display = "flex";

            userName.innerText = auth.currentUser.displayName ?? "Sem nome";
            userEmail.innerText = auth.currentUser.email ?? "";
            userPhoto.src = auth.currentUser.photoURL ?? "assets/images/user.png";

        } else {

            button.style.display = "flex";
            profile.style.display = "none";

        }

    });

 }