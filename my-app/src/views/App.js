import Header from '../components/Header';
import './App.scss';
import TableUser from '../components/TableUser';
import Container from 'react-bootstrap/Container';
import ModalAddNew from '../components/ModalAddNew';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const handleSaveUser = () => {
  // some code to save user

  toast.success("User saved successfully");
}


function App() {

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
  }



  return (
    <div className='app-container'>
      <Header />
      <Container>
        <div className='my-3 add-new'>
          <h3>List User: </h3>
          <button className='btn btn-primary'
            onClick={() => setIsShowModalAddNew(true)}>Add User</button>
        </div>
        <TableUser />
      </Container>

      <ModalAddNew show={isShowModalAddNew}
        handleClose={handleClose} />


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </div>


  );
}

export default App;
