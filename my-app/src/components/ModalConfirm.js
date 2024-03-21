import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {deleteUser} from "../services/UserService";
import {toast} from "react-toastify";

function ModalConfirm(props) {
  const { show, handleClose, dataUserDelete, handleDeleteUserFormModal } = props;
 
  const confirmDelete = async() => {
    let res = await deleteUser(dataUserDelete.id);
    if(res && +res.status === 204){
      toast.success("Delete user success");
      handleDeleteUserFormModal(dataUserDelete);
    }else{
      toast.error("Delete user fail");
    }

    console.log("Delete user");
    handleClose();
  }

  return (
    <>
      <Modal 
      show={show} 
      onHide={handleClose}
      backdrop="static"
      keyboard={false}>

        <Modal.Header closeButton>
          <Modal.Title>Confirm delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="body-add-new">
              Are you sure to delete this user 
              <br/>
              <b>Email: {dataUserDelete.email}</b>
             </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfirm;
