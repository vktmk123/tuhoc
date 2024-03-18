// import axios from "axios";
import axios from "./customize-axios";

const fetchAllUsers = () => { 
    return axios.get('/api/users?page=2');
  }

export {fetchAllUsers};