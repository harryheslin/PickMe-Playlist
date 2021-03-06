import axios from "axios";

export default function FetchServer(value, token, data) {
    return new Promise((resolve, reject) => {
            let params = new URLSearchParams();
            params.append('token', token);
            params.append('data', value === 'playlist' || value === 'save' ? JSON.stringify({ data }) : data);
            axios.post(`http://localhost:3010/${value}`, params)
                .then(res => {
                    if (res.status === 200) {
                        const result = res.data;
                        resolve(result);
                    } 
                })
                .catch((e) => {
                    console.log(e)
                    reject(e)
                })
    })
}