import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import {fetchAllUsers} from '../services/UserService';  
import ReactPaginate from 'react-paginate';

const TableUser = (props) => {
    const[listUsers, setListUser] = useState([]);
    const[totalUsers, setTotalUsers] = useState(0);
    const[totalPages, setTotalPages] = useState(0);


    useEffect(() => {
      //call api
      getUsers(1);}, [])

    const getUsers = async(page) => {
        let res = await fetchAllUsers(page);
        if(res && res.data){
            setTotalUsers(res.total);
            setTotalPages(res.total_pages);
            setListUser(res.data);
        }
        console.log("res: ", res);
    }
    
    const handlePageClick = async (event) => {
      getUsers(+event.selected+1);
      console.log("event lib:", event)
    }

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
        {listUsers && listUsers.length > 0 && listUsers.map((user, index) => {
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
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick} 
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'
      />
    

        </>
    );
}

export default TableUser;