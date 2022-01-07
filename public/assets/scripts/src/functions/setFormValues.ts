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
                    break;

                case "radio":
                    const radio = formEl.querySelector(`[name=${key}][value='${values[key]}']`) as HTMLInputElement;
                    if (radio) {
                        radio.checked = true;
                    }
                    break;
                case "checkbox":
                    if (Boolean(Number(values[key]))) {
                        (field as HTMLInputElement).checked = true;                    
                    }
                    break;
                default:
            }
        } else if (field.tagName.toLowerCase() === "textarea") {
            field.innerHTML = values[key];
        } else {
            const option = field.querySelector<HTMLOptionElement>(`option[value=${values[key]}]`);

            const select = field as HTMLSelectElement;

            if (!select.multiple) {

                field.querySelectorAll<HTMLOptionElement>("option:checked").forEach(option => {
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