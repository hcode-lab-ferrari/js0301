"use strict";
exports.__esModule = true;
var queryStringToJSON_1 = require("./functions/queryStringToJSON");
var setFormValues_1 = require("./functions/setFormValues");
var imask_1 = require("imask");
var page = document.querySelector("#schedules-payment");
if (page) {
    var form = page.querySelector("form");
    var name_1 = page.querySelector("#name");
    var number_1 = page.querySelector("#number");
    var expiry_1 = page.querySelector("#expiry");
    var inputCvv_1 = page.querySelector("#cvv");
    var creditCard_1 = page.querySelector("#credit-card");
    var svgName_1 = page.querySelector("svg .name");
    var svgNumber1_1 = page.querySelector("svg .number-1");
    var svgNumber2_1 = page.querySelector("svg .number-2");
    var svgNumber3_1 = page.querySelector("svg .number-3");
    var svgNumber4_1 = page.querySelector("svg .number-4");
    var svgExpiry_1 = page.querySelector("svg .expiry");
    var svgCvv_1 = page.querySelector("svg .cvv");
    setFormValues_1["default"](form, queryStringToJSON_1["default"]());
    name_1.addEventListener("keyup", function (e) {
        svgName_1.innerHTML = name_1.value.toUpperCase();
    });
    number_1.addEventListener("keyup", function (e) {
        var numberString = number_1.value.replaceAll(" ", "");
        svgNumber1_1.innerHTML = numberString.substring(0, 4);
        svgNumber2_1.innerHTML = numberString.substring(4, 8);
        svgNumber3_1.innerHTML = numberString.substring(8, 12);
        svgNumber4_1.innerHTML = numberString.substring(12, 16);
    });
    expiry_1.addEventListener("keyup", function (e) {
        svgExpiry_1.innerHTML = expiry_1.value;
    });
    inputCvv_1.addEventListener("keyup", function (e) {
        svgCvv_1.innerHTML = inputCvv_1.value;
    });
    creditCard_1.addEventListener("click", function (e) {
        creditCard_1.classList.toggle("flipped");
    });
    inputCvv_1.addEventListener("focus", function (e) {
        creditCard_1.classList.toggle("flipped");
    });
    inputCvv_1.addEventListener("blur", function (e) {
        creditCard_1.classList.toggle("flipped");
    });
    imask_1["default"](number_1, {
        mask: "0000 0000 0000 0000"
    });
    var year = new Date().getFullYear();
    imask_1["default"](expiry_1, {
        mask: "MM/YY",
        blocks: {
            YY: {
                mask: imask_1["default"].MaskedRange,
                from: year.toString().substring(2, 4),
                to: (year + 10).toString().substring(2, 4)
            },
            MM: {
                mask: imask_1["default"].MaskedRange,
                from: 1,
                to: 12
            }
        }
    });
    imask_1["default"](inputCvv_1, {
        mask: "000[0]"
    });
    page.querySelectorAll("input").forEach(function (input) {
        input.addEventListener("focus", function (e) {
            page.classList.add("keyboard-open");
        });
    });
    page.querySelectorAll("input").forEach(function (input) {
        input.addEventListener("blur", function (e) {
            page.classList.remove("keyboard-open");
        });
    });
}
