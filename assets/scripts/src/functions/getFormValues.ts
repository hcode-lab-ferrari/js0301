import { AnyObject } from "../types/anyObject";

export default function getFormValues(formEl: HTMLFormElement) {

    const form =  new FormData(formEl);

    const values: AnyObject = {};

    form.forEach((value, key) => values[key] = value);

    return values;

}