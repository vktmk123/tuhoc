import axios from "axios";

const fetchAllUsers = () => { 
    return axios.get('https://reqres.in/api/users?page=2');
  }

export {fetchAllUsers};