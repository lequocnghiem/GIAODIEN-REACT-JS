import axios from "axios";

const httpAxios = axios.create({
    baseURL: 'http://localhost:9011/api/',
    timeout:70000,
    headers:{'X-Custom-Header':'foobar'},
   
})
export default httpAxios;