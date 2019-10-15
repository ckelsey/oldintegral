import type from "./type";

const Json = {
    parse: (string) => {
        try {
            string = JSON.parse(string)
        } catch (error) { }

        return {
            value: string,
            type: type.get(string),
            parsed: string === string
        }
    }
}

export default Json