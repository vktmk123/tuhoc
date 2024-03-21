import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { putUpdateUser } from "../services/UserService";
import { toast } from "react-toastify";

function ModalEditUser(props) {
  const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleEditUser = async () => {
    let res = await putUpdateUser(name, role);
    //success
    if (res && res.updatedAt) {
        handleEditUserFromModal({
        first_name: name,
        role: role,
        id: dataUserEdit.id
      })
      handleClose();
      toast.success("Edit user success");
    }

    console.log("success: ", res);
  }
  

  useEffect(() => {
    if (show){
      setName(dataUserEdit.first_name);
      setRole(dataUserEdit.role);
    }
  }, [dataUserEdit])


  return (
    <>
      <Modal 
      show={show} 
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(even) => setName(even.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  placeholder="Role"
                  value={role}
                  onChange={(even) => setRole(even.target.value)}
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditUser;
