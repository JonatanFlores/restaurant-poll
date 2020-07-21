import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { toast } from 'react-toastify';
import { logout } from '../../actions/auth';

export default function Navigation() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  function signout() {
    dispatch(logout());
    toast.success('Deslogado com sucesso. Volte sempre :)', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }

  return (
    <>
      {user && (
        <div>
          <Container fluid className="bg-info d-flex text-light py-1">
            <p className="my-0 ml-auto">Olá, <b>{user.name}</b>!</p>
          </Container>
        </div>
      )}
      <Navbar color="dark" dark expand="sm">
        <NavbarBrand to="/">Almoço Democrático</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink exact tag={Link} to="/">
              Restaurantes
            </NavLink>
          </NavItem>
          {!isAuthenticated ? (
            <NavItem>
              <NavLink tag={Link} to="/login">
                Entrar
              </NavLink>
            </NavItem>
          ) : (
            <NavItem>
              <a onClick={signout} href="#!" className="nav-link">Sair</a>
            </NavItem>
          )}
          
        </Nav>
      </Navbar>
    </>
  );
}