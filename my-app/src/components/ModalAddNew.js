import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useState} from 'react';
import { postCreateUser } from '../services/UserService';
import { toast } from 'react-toastify';

function ModalAddNew(props) {
    const { show, handleClose } = props;
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const handleSaveUser = async () => {
        let res = await postCreateUser(name, role);
        console.log('check res >>>: ', res);
        if(res && res.id){
            handleClose();
            setName('');
            setRole('');
            toast.success('Create user successfully');
        }
        else{
            toast.error('Create user failed');
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                className='form-control'
                                type="text" 
                                placeholder="Enter Name" 
                                value={name} 
                                onChange={(even)=> setName(even.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicRole"> 
                                <Form.Label>Role</Form.Label>
                                <Form.Control 
                                className='form-control'
                                type="text" 
                                placeholder="Role" 
                                value={role} 
                                onChange={(even)=> setRole(even.target.value)}
                                />
                            </Form.Group>       
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddNew;

