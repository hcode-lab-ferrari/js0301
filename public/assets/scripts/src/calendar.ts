import format from "date-fns/format";
import endOfMonth from "date-fns/endOfMonth";
import startOfMonth from "date-fns/startOfMonth";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import locale from "date-fns/locale/pt-BR"
import { differenceInSeconds } from "date-fns";

const page = document.querySelector("#schedules-new");

if (page) {

    const hoje = new Date();
    let inicioMes = startOfMonth(hoje);
    const fimMes = endOfMonth(hoje);

    const btnHoje = page.querySelector(".btn-today") as HTMLButtonElement;
    const btnAnterior = page.querySelector(".btn-prev") as HTMLButtonElement;
    const btnProximo = page.querySelector(".btn-next") as HTMLButtonElement;
    const titulo = page.querySelector("h2") as HTMLHeadingElement;
    const calendar = page.querySelector(".days") as HTMLUListElement;

    const render = () => {

        titulo.innerText = format(inicioMes, "MMMM yyyy", { locale });
        
        calendar.innerHTML = "";

        let diaCorrente = startOfWeek(inicioMes);
        const ultimoCalendario = endOfWeek(endOfMonth(inicioMes));

        while(differenceInSeconds(ultimoCalendario, diaCorrente) > 0) {

            const li = document.createElement("li");

            li.innerText = format(diaCorrente, 'd');

            li.dataset.schedule = format(diaCorrente, 'yyyy-MM-dd');

            if (format(diaCorrente, 'yyyyMM') < format(inicioMes, 'yyyyMM')) {
                li.classList.add('month-prev');
            }

            if (format(diaCorrente, 'yyyyMM') > format(inicioMes, 'yyyyMM')) {
                li.classList.add('month-next');
            }

            if (format(diaCorrente, 'yyyyMMdd') === format(hoje, 'yyyyMMdd')) {
                li.classList.add('active');
            }

            li.addEventListener("click", (e: Event) => {

                const selected = calendar.querySelector(".selected");

                if (selected) {
                    selected.classList.remove("selected");
                }

                const myLi = e.target as HTMLLIElement;

                myLi.classList.add("selected");

                const scheduleAt = document.querySelector("[name=schedule_at]") as HTMLInputElement;

                scheduleAt.value = myLi.dataset.schedule ?? "";

            });

            calendar.appendChild(li);

            diaCorrente = addDays(diaCorrente, 1);

        }
        

    }

    btnProximo.addEventListener("click", ()=> {
        inicioMes = addMonths(inicioMes, 1);
        render();
    });

    btnAnterior.addEventListener('click', () => {
        inicioMes = subMonths(inicioMes, 1);
        render();
    });

    btnHoje.addEventListener("click", () => {
        inicioMes = startOfMonth(hoje);
        render();
    });
    

    render();

}