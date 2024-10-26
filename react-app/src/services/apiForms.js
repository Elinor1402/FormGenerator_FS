import axios from 'axios'
import { getToken } from './authHelpers'

const api = axios.create({

    baseURL: 'http://localhost:3000/forms',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

function getQuestions(formName) {
    return api.get(`/data`, { params: { answer: formName } });
}
function getPrivateQuestions(formName) {
    return api.get(`/p-data`, { params: { answer: formName }, headers: { 'Authorization': 'Bearer '.concat(getToken()) } });
}
function getDomains() {
    return api.get(`/domains`, { headers: { 'Authorization': 'Bearer '.concat(getToken()) } });
}
const apiForms = {
    getQuestions,
    getPrivateQuestions,
    getDomains,
}

export default apiForms;