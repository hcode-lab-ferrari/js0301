const page = document.querySelector("#change-photo") as HTMLElement;

if (page) {

    const imgPreview = page.querySelector("#photo-preview") as HTMLImageElement;
    const inputFile = page.querySelector("#file") as HTMLInputElement;
    const buttonChoose = page.querySelector(".choose-photo") as HTMLButtonElement;

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

}