import queryStringToJSON from "./functions/queryStringToJSON";
import setFormValues from "./functions/setFormValues";
import { HTMLInputField } from "./types/HTMLInputField";
import IMask from "imask";
const page = document.querySelector("#schedules-payment") as HTMLElement;

if (page) {
  const form = page.querySelector("form") as HTMLFormElement;
  const name = page.querySelector("#name") as HTMLInputField;
  const number = page.querySelector("#number") as HTMLInputField;
  const expiry = page.querySelector("#expiry") as HTMLInputField;
  const inputCvv = page.querySelector("#cvv") as HTMLInputField;
  const creditCard = page.querySelector("#credit-card") as HTMLDivElement;

  const svgName = page.querySelector("svg .name") as SVGTSpanElement;
  const svgNumber1 = page.querySelector("svg .number-1") as SVGTSpanElement;
  const svgNumber2 = page.querySelector("svg .number-2") as SVGTSpanElement;
  const svgNumber3 = page.querySelector("svg .number-3") as SVGTSpanElement;
  const svgNumber4 = page.querySelector("svg .number-4") as SVGTSpanElement;

  const svgExpiry = page.querySelector("svg .expiry") as SVGTSpanElement;
  const svgCvv = page.querySelector("svg .cvv") as SVGTSpanElement;

  setFormValues(form, queryStringToJSON());

  name.addEventListener("keyup", (e) => {
    svgName.innerHTML = name.value.toUpperCase();
  });

  number.addEventListener("keyup", (e) => {
    const numberString = number.value.replaceAll(" ", "");

    svgNumber1.innerHTML = numberString.substring(0, 4);
    svgNumber2.innerHTML = numberString.substring(4, 8);
    svgNumber3.innerHTML = numberString.substring(8, 12);
    svgNumber4.innerHTML = numberString.substring(12, 16);
  });

  expiry.addEventListener("keyup", (e) => {
    svgExpiry.innerHTML = expiry.value;
  });

  inputCvv.addEventListener("keyup", (e) => {
    svgCvv.innerHTML = inputCvv.value;
  });

  creditCard.addEventListener("click", (e) => {
    creditCard.classList.toggle("flipped");
  });
  inputCvv.addEventListener("focus", (e) => {
    creditCard.classList.toggle("flipped");
  });
  inputCvv.addEventListener("blur", (e) => {
    creditCard.classList.toggle("flipped");
  });

  IMask(number, {
    mask: "0000 0000 0000 0000",
  });

  const year = new Date().getFullYear();

  IMask(expiry, {
    mask: "MM/YY",
    blocks: {
      YY: {
        mask: IMask.MaskedRange,
        from: year.toString().substring(2, 4),
        to: (year + 10).toString().substring(2, 4),
      },
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
      },
    },
  });

  IMask(inputCvv, {
    mask: "000[0]",
  });

  page.querySelectorAll("input").forEach((input) => {
    input.addEventListener("focus", (e) => {
      page.classList.add("keyboard-open");
    });
  });

  page.querySelectorAll("input").forEach((input) => {
    input.addEventListener("blur", (e) => {
      page.classList.remove("keyboard-open");
    });
  });
}
