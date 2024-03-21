import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reqres.in'
});

instance.interceptors.response.use(function (response) {
    // console.log("lay: ", response);
    return response.data ? response.data : {status: response.status, message: response.statusText};
},
    function (error) {
        return Promise.reject(error);
    });

export default instance;