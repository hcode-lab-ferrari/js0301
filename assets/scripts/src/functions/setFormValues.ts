import { AnyObject } from "../types/anyObject";
import { HTMLInputField } from "../types/HTMLInputField";

export default function setFormValues(formEl: HTMLFormElement, values: AnyObject) {

  Object.keys(values).forEach(key => {

    const field = formEl.querySelector<HTMLInputField>(`[name=${key}]`);

    if (field) {

        if (field.tagName.toLowerCase() === "input") {
            switch (field.type) {
                case "hidden":
                case "text":
                case "number":
                case "email":
                case "tel":
                case "url":
                case "password":
                case "color":
                    field.value = values[key];
            }
        } else if (field.tagName.toLowerCase() === "textarea") {
            field.innerHTML = values[key];
        } else {
            const option = field.querySelector<HTMLOptionElement>(`option[value=${values[key]}]`);

            const select = field as HTMLSelectElement;

            if (!select.multiple) {

                field.querySelectorAll<HTMLOptionElement>("option:selected").forEach(option => {
                    option.selected = false;
                })

            }

            if (option) {

                option.selected = true;

            }
        }

    }

  });

}