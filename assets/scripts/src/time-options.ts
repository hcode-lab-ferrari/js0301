import queryStringToJSON from "./functions/queryStringToJSON";
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import locale from 'date-fns/locale/pt-BR';
import { TimeOptionItem } from "./types/timeOptionItem";
import appendChild from "./functions/appendChild";

const page = document.querySelector("#time-options") as HTMLElement;

if (page) {

    const timeOptions: TimeOptionItem[] = [{
        name: '9:00',
        value: 9
    }, {
        name: '10:00',
        value: 10
    }, {
        name: '11:00',
        value: 11
    }, {
        name: '12:00',
        value: 12
    }, {
        name: '13:00',
        value: 13
    }, {
        name: '14:00',
        value: 14
    }, {
        name: '15:00',
        value: 15
    }, {
        name: '16:00',
        value: 16
    }];
    const title = page.querySelector("h3") as HTMLHeadingElement;
    const options = page.querySelector(".options") as HTMLDivElement;
    const values = queryStringToJSON();
    const scheduleAtInput = page.querySelector("[name=schedule_at]") as HTMLInputElement;

    scheduleAtInput.value = values.schedule_at;

    const scheduleAt = parse(values.schedule_at, 'yyyy-MM-dd', new Date());

    if (scheduleAt.toString() === "Invalid Date") {
        location.href = "schedules-new.html";
    } else {

        const checkSelectedInput = () => {

            const button = page.querySelector("[type=submit]") as HTMLButtonElement;

            if (page.querySelector("[name=option]:checked")) {
                button.disabled = false;
            } else {
                button.disabled = true;
            }

        }

        options.innerHTML = "";

        timeOptions.forEach(item => {

            const label = appendChild(
                "label",
                `
                    <input type="radio" name="option" value="${item.value}" />
                    <span>${item.name}</span>
                `, 
                options
            );

            const labelInput = label.querySelector("input") as HTMLInputElement;

            labelInput.addEventListener("change", checkSelectedInput);

        });

        title.innerText = format(scheduleAt, "cccc, d 'de' MMMM 'de' yyyy", { locale });

    }


}