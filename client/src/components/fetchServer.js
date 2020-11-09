import axios from "axios";

export default function FetchServer(value) {
    return new Promise((resolve, reject) => {
        try {
            axios.post(`http://localhost:3010/${value}`)
                .then(res => {
                    const result = res.data;
                    resolve(result);
                })
        }
        catch (e) {
            reject(e);
        }
    })
}