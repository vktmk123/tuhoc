import Header from '../components/Header';
import './App.scss';
import TableUser from '../components/TableUser';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div className='app-container'>
      <Container>
          <Header />
          <TableUser />
      </Container>

    </div>
  );
}

export default App;
