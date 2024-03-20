// import axios from "axios";
import axios from "./customize-axios";

const fetchAllUsers = (page) => { 
    return axios.get(`/api/users?page=${page}`);
  }

  // Create a new user
  const postCreateUser = (name, role) => {
      return axios.post("/api/users", {name:name, role:role});
  }

  
export {fetchAllUsers, postCreateUser};