import Usuarios from './Components/Usuarios';
import Home from './Components/Home';
import MyComponents from './Components/Rastrear';
import {BrowserRouter, Routes, Link, Route} from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Components/Captura de tela 2021-10-30 145202.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Link className='logo' to='/'><img id='logo' src={logo} width='170px' alt='Logo' justify='center' /></Link>
      <Nav id='navs' variant='tabs' justify='center'>
        <Nav.Link id='navs1' as={Link} to='/'>Início</Nav.Link>
        <Nav.Link id='navs2' as={Link} to='/usuarios'>Usuário</Nav.Link>
        <Nav.Link id='navs2' as={Link} to='/rastrear'>Rastrear</Nav.Link>

      </Nav>

      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/usuarios' element={<Usuarios/>}></Route>
        <Route path='/rastrear' element={<MyComponents/>}></Route>
      </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
