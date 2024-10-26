import axios from 'axios'

const api = axios.create({

    baseURL: 'http://localhost:3000/user',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

function register(formData) {
    return api.post(`/sign-up`, { formData: formData });
}
function login(formData) {
    return api.post(`/log-in`, { formData: formData });
}

const apiUser = {
    register,
    login,
}

export default apiUser;