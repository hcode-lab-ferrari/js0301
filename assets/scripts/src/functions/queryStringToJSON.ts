import { AnyObject } from "../types/anyObject";

export default function queryStringToJSON() {

    let values = {} as AnyObject;
    const queryString = location.search;

    if (queryString) {
        queryString.split('?')[1].split('&').forEach(item => {

            const nameAndValue = item.split("=");
            const name = nameAndValue[0];
            const value = nameAndValue[1];

            if (values[name]) {

                if (values[name] instanceof Array) {
                    values[name].push(value);
                } else {
                    values[name] = [values[name], value];
                }

            } else {
                values[name] = value;
            }

        });
    }

    return values;

}