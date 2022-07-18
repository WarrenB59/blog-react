import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom';
import { FRONT_URL_ACCUEIL, FRONT_URL_ADD_ARTICLE, FRONT_URL_A_PROPOS, FRONT_URL_LOGIN, FRONT_URL_REGISTER } from "../constants/urlConstants";
import { signOut } from "../redux/user/authenticationAction";
import { accountRoles } from "../services/accountService";

const Navigation = () => {

const isLogged = useSelector(state => state.authenticationReducer.logged)
const dispatch = useDispatch();
const navigate = useNavigate()
const roles = () => {
    if (isLogged) return accountRoles()
    return []
}
const logout = () => {
    let preLogout = async () => {
        dispatch(signOut())
    }
    preLogout().then(() => navigate("/"))
}

    return (
        <>
            <Navbar sticky="top" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={ NavLink } to={FRONT_URL_ACCUEIL}>Blog</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={ NavLink } to ={FRONT_URL_A_PROPOS}>A propos</Nav.Link>
                        {roles().map(
                            (role) =>
                                role === "ROLE_ADMIN" && (
                                    <Nav.Link key={role} as={NavLink} to={FRONT_URL_ADD_ARTICLE}>
                                        Ajouter article
                                    </Nav.Link>
                                )
                        )}       
                    </Nav>
                    <Nav className="justify-content-end">
                        {isLogged ?
                            <Nav.Link to='#' as={ NavLink } onClick={() => logout()}>logout</Nav.Link>
                        :
                        <>
                            <Nav.Link as={ NavLink } to ={FRONT_URL_LOGIN}>login</Nav.Link>  
                            <Nav.Link as={ NavLink } to ={FRONT_URL_REGISTER}>register</Nav.Link>
                        </>}     
                    </Nav>
                </Container>
            </Navbar> 
        </>
    );
}
export default Navigation;