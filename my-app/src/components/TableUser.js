import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/UserService";
import ReactPaginate from "react-paginate" ;
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _, { debounce, includes, set } from "lodash";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/TableUser.scss';
import { CSVLink, CSVDownload } from "react-csv";
import Papa from 'papaparse';
import { toast } from "react-toastify";


const TableUser = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [sortBy, setSortBy] = useState('asc');
  const [sortField, setSortField] = useState('id');
  const [keyword, setKeyword] = useState('');
  const [dataExort, setDataExport] = useState([]);


  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);

  }

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  }
  
  const handleEditUserFromModal = (user) => {
    // let cloneListUsers = [...listUsers]; cach 1 cach 2 o duoi
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex(item => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;
    setListUsers(cloneListUsers);
    
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

  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true)
    setDataUserDelete(user);
    console.log("delete user: ", user);
  }

  const handleDeleteUserFormModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);
    setListUsers(cloneListUsers);
  }

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    console.log("cloneListUsers: ", cloneListUsers);
    setListUsers(cloneListUsers);
  }

  const handelSearch = debounce( (event) => {
    
      let term = event.target.value;
      console.log("term: ", term);
      if(term){  
          let cloneListUsers = _.cloneDeep(listUsers);
          cloneListUsers = cloneListUsers.filter(item => item.email.includes(term));
          setListUsers(cloneListUsers);
        }
        else{
        getUsers(1);
      }
  },500);

  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  ];

const getUsersExport = (event, done) => {
    let result = [];
    if(listUsers && listUsers.length > 0){
      result.push(["ID", "Email", "First Name", "Last Name"]);
      listUsers.map((item, index) => {
        let arr = [];
            arr[0] = item.id;
            arr[1] = item.email;
            arr[2] = item.first_name;
            arr[3] = item.last_name;
            result.push(arr);
      });

      setDataExport(result);
      done();
    }
}

const handleImportCSV = (event) => {
  if(event.target && event.target.files && event.target.files[0]){
    let file = event.target.files[0];

    if(file.type !== 'text/csv'){
      toast.error("File must be csv");
      return;
    }

    Papa.parse(file, {
      // header: true,
      complete: function(results){
        let rawCSV  = results.data;
        if(rawCSV.length > 0) {
          if(rawCSV[0] && rawCSV[0].length === 3){
            console.log("rawCSV: ");
            if(rawCSV[0][0] !== "email"
            || rawCSV[0][1] !== "first_name"
            || rawCSV[0][2] !== "last_name"
            ){
              toast.error("wrong format csv file");       
            }else{
              let result = [];  

              rawCSV.map((item, index) => {
                if(index >0 && item.length === 3){
                  let obj = {};
                  obj.email = item[0];
                  obj.first_name = item[1];
                  obj.last_name = item[2];
                  result.push(obj);
                }
              })
              setListUsers(result); 
              console.log("result: ", result);          
          }
        }else{
          toast.error("Data is empty");
        }
      }else
          toast.error("not found data file");
      }
    });
  }
}
  return (
    <>
      <div className="my-3 add-new">
        <h3>List User: </h3>
        <div className="group-button">

          <label htmlFor="test" className="btn btn-warning">
          <i className="fa-solid fa-file-import mx-1"></i>import
          </label>
          <input id="test" type="file" hidden 
          onChange={(event) => handleImportCSV(event)}/>

          <CSVLink 
          data={dataExort}
          filename={"user.csv"}
          className="btn btn-primary"
          asyncOnClick={true}
          onClick={getUsersExport}
          >
          <i className="fa-solid fa-file-arrow-down mx-1">
          </i>Export</CSVLink>    
        <button
          className="btn btn-success"
          onClick={() => setIsShowModalAddNew(true)}>
          <i className="fa-solid fa-circle-plus mx-1"></i>
          Add User
        </button>
        </div>
      </div>
      <div className="col-4 my-3"> 
        <input className="form-control" 
              placeholder="Search user by email" 
              // value={keyword}
              onChange={(event) =>{
                handelSearch(event);
              }}/>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="sort-header"><span>ID</span> 
            <span>
                  <i className="fa-solid fa-arrow-down"
                  onClick={()=> handleSort('desc', 'id')}
                  ></i>
                  <i className="fa-solid fa-arrow-up"
                  onClick={()=> handleSort('asc', 'id')}
                  ></i>
            </span>
                  </th>
            <th>Email</th>
            <th >
              <div className="sort-header">
                <span>First Name</span>
                <span>
                  <i 
                  className="fa-solid fa-arrow-down"
                  onClick={() => handleSort("desc", "first_name")}
                  ></i>
                  <i className="fa-solid fa-arrow-up"
                  onClick={()=> handleSort("asc", "first_name")}
                  ></i>
            </span>
            </div>
              
            </th>
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
                    <button 
                    className="btn btn-danger mx-3" 
                    onClick={()=> handleDeleteUser(user)}>
                      Delete
                      </button>
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
      <ModalConfirm 
      show={isShowModalDelete} 
      handleClose={handleClose} 
      dataUserDelete={dataUserDelete}
      handleDeleteUserFormModal={handleDeleteUserFormModal}
      />
      
    </>
  );
};

export default TableUser;
