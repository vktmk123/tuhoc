import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import {fetchAllUsers} from '../services/UserService';  

const TableUser = (props) => {
    const[listUsers, setListUser] = useState([]);
    
    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async() => {
        let res = await fetchAllUsers();
      
        if(res && res.data){
            setListUser(res.data);
        }
        console.log("res: ", res);
    }
    console.log("listUsers: ", listUsers);

    return (
        <>
         <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last name</th>
        </tr>
      </thead>
      <tbody>
        {listUsers && listUsers.length > 0 &&

        listUsers.map((user, index) => {
          return (
            <tr key={`index-${index}`}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
            </tr>
          )
        })
        }
      </tbody>
    </Table>
        </>
    );
}

export default TableUser;