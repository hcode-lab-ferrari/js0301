import { AnyObject } from "../types/anyObject";

export default function queryStringToJSON() {

    let values = {} as AnyObject;
    const queryString = location.search;

    if (queryString) {
        queryString.split('?')[1].split('&').forEach(item => {

            const nameAndValue = item.split("=");

            values[nameAndValue[0]] = nameAndValue[1];

        });
    }

    return values;

}