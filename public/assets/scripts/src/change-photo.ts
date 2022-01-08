import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const page = document.querySelector("#change-photo") as HTMLElement;
const storage = getStorage();

if (page) {

    const form = page.querySelector("form") as HTMLFormElement;
    const imgPreview = page.querySelector("#photo-preview") as HTMLImageElement;
    const inputFile = page.querySelector("#file") as HTMLInputElement;
    const buttonChoose = page.querySelector(".choose-photo") as HTMLButtonElement;

    onAuthStateChanged(auth, () => {

        if (!auth.currentUser) {
    
            location.href = "/";
        
        } else {

            imgPreview.src = auth.currentUser.photoURL ?? "assets/images/user@4x.png";

        }
    
    });

    buttonChoose.addEventListener("click", () => {

        inputFile.click();

    });

    inputFile.addEventListener("change", () => {

        if (inputFile.files?.length) {

            const file = inputFile.files[0];

            const reader = new FileReader();

            buttonChoose.disabled = true;

            reader.onload = () => {

                buttonChoose.disabled = false;

                if (reader.result) {

                    imgPreview.src = reader.result as string;

                }

            }

            reader.readAsDataURL(file);

        }

    });

    form.addEventListener("submit", e => {

        e.preventDefault();

        const button = form.querySelector("[type=submit]") as HTMLButtonElement;

        if (inputFile.files?.length) {

            const file = inputFile.files[0];

            const ext = file.type.split("/")[1];

            const fileRef = ref(storage, `photos/${uuidv4()}.${ext}`);


            button.disabled = true;

           uploadBytes(fileRef, file).then(snapshot => {

            getDownloadURL(fileRef).then(url => {

                button.disabled = false;

                if (auth.currentUser) {
                    updateProfile(auth.currentUser, {
                        photoURL: url
                    });

                    const photoEl = document.querySelector("#header > div.menu > div > div > picture > a > img") as HTMLImageElement;

                    photoEl.src = url;

                }

            });

           }).catch(error => {

            console.error(error.message);

           });

        }


        

    });

}