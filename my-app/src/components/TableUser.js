import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";

const TableUser = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});



  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
  }

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  }
  
  const handleEditUserFromModal = (user) => {
    let cloneListUsers = [...listUsers];
    let index = listUsers.findIndex(item => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;

    console.log(listUsers, cloneListUsers);
    console.log("index: ", index);
    
  }


  useEffect(() => {
    //call api
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUsers(page);
    if (res && res.data) {
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
      setListUsers(res.data);
    }
    // console.log("res: ", res);
  };

  const handlePageClick = async (event) => {
    getUsers(+event.selected + 1);
    console.log("event lib:", event);
  };

  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  }

  return (
    <>
      <div className="my-3 add-new">
        <h3>List User: </h3>
        <button
          className="btn btn-primary"
          onClick={() => setIsShowModalAddNew(true)}
        >
          {" "}
          Add User{" "}
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>
                    <button className="btn btn-warning mx-3"
                    onClick={()=> handleEditUser(user)}> Edit</button>
                    <button className="btn btn-danger mx-3">Delete</button>
                  </td>
                </tr>
              );
            })}
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
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser 
      show={isShowModalEdit}
      dataUserEdit={dataUserEdit}
      handleClose={handleClose}
      handleEditUserFromModal={handleEditUserFromModal}
      />
      
    </>
  );
};

export default TableUser;
