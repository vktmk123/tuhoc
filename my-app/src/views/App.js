import Header from "../components/Header";
import "./App.scss";
import TableUser from "../components/TableUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "react-bootstrap/Container";

const handleSaveUser = () => {
  // some code to save user

  toast.success("User saved successfully");
};

function App() {
  return (
    <div className="app-container">
      <Header />
      <Container>
        <TableUser />
      </Container>

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
