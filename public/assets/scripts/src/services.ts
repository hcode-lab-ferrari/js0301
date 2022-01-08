import appendChild from "./functions/appendChild";
import formatCurrency from "./functions/formatCurrency";
import queryStringToJSON from "./functions/queryStringToJSON";
import setFormValues from "./functions/setFormValues";
import { ServiceItem } from "./types/serviceItem";
import {getFirestore, onSnapshot, collection} from "firebase/firestore";



const page = document.querySelector("#schedules-services") as HTMLElement;

if (page) {

    const db = getFirestore();
    let servicesSelected: number[] = [];
    let services: ServiceItem[] = [];

    const calcTotal = () => {

        const totalElement = document.querySelector(".total") as HTMLSpanElement;

        const selected = services.filter(service => servicesSelected.find(id => service.id === id));

        const total = selected.map(service => service.price).reduce((a, b) => a + b, 0);

        totalElement.innerHTML = formatCurrency(total);

    }

    const renderCart = () => {

        const tbody = page.querySelector("tbody") as HTMLTableSectionElement;

        tbody.innerHTML = "";

        servicesSelected.forEach(id => {

            const linha = document.createElement("tr");
            const service = services.find(s => s.id === id);

            if (service) {

                linha.innerHTML = `
                    <tr>
                        <td>${service.name}</td>
                        <td class="price">${formatCurrency(service.price)}</td>
                    </tr>
                `;

            }

            tbody.appendChild(linha);

        });

    }

    const serviceSelectedChange = (e: Event) => {

        const input = e.target as HTMLInputElement;
        const button = document.querySelector("[type=submit]") as HTMLButtonElement;

        if (input.checked) {

            servicesSelected.push(Number(input.value));

        } else {

            servicesSelected = servicesSelected.filter(id => id !== Number(input.value));

        }

        if (servicesSelected.length) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }

        calcTotal();
        renderCart();

    }

  
    const tpl = document.querySelector("#tpl-label") as HTMLScriptElement;
    const options = page.querySelector(".options") as HTMLDivElement;
    const values = queryStringToJSON();
    const form= page.querySelector("form") as HTMLFormElement;

    setFormValues(form, values);

    options.innerHTML = "";

    const renderServices = () => {

        options.innerHTML = "";

        services.forEach(item => {

            item.priceFormated = formatCurrency(item.price);

            const label= appendChild("label", eval("`"+ tpl.innerText + "`"), options);
            
            const labelInput = label.querySelector("input") as HTMLInputElement;

            labelInput.addEventListener("change", serviceSelectedChange);

        });

    }

    renderCart();

    onSnapshot(collection(db, "services"), (collection) => {
        
        services = [];

        collection.forEach(doc => {
            services.push(doc.data() as ServiceItem);
        });

        renderServices();

    });

}