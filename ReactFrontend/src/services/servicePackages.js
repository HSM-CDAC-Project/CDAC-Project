import axios from "axios";
import config from "../config";


export async function getPackages({serviceId}) {
// export async function getPackages() {
    
        const response = await axios.get(`${config.url}/service/${serviceId}`)
        // const response = await axios.get(`${config.url}/service/1`)
        return response.data
}