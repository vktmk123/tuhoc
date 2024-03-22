import Header from "../components/Header";
import "./App.scss";
import TableUser from "../components/TableUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "react-bootstrap/Container";
import Home from "../components/Home";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Container>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<TableUser />}/>
          <Route path="/login" element={<Login/>}/> 
        </Routes>
        {/* <TableUser /> */}
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
