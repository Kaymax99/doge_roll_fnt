import {Navbar, Container, Nav, NavDropdown, Row, Col} from "react-bootstrap"
import { Link } from "react-router-dom"
import logo from "../assets/img/logo.png"
import {List} from "react-bootstrap-icons"

export const CustomNavbar = () => {

    return (
        <>
        <Navbar bg="primary" className="p-0">
            <Container className="position-relative">
                <Row className="justify-content-center w-100 mx-0">
                    <Col xs={12} className="text-md-center py-2 upperNav d-flex align-items-center">
                        <img src={logo} alt="logo" id="navLogo"></img>
                        <div className="nav-dropdown" data-dropdown>
                            <List className="mobile-nav-btn d-md-none" data-dropdown-button data-mobile-dropdown-button/>
                            <div className="mobile-dropdown-menu d-md-none">
                                <Link to={"/register"} className="nav-link">Play Now</Link>
                                <Link to={"/search"} className="nav-link">Join a Game (WIP)</Link>
                                <Link to={"/login"} className="nav-link link-login">Log in/Sign up</Link>
                            </div>
                        </div>
                    </Col>
                    <Col md={12} className="d-flex py-2 justify-content-center d-none d-md-flex">
                            <Nav className="w-100">
                                <Col xs ={8} className="d-flex">
                                    <Link to={"/register"} className="nav-link me-3">Play Now</Link>
                                    <Link to={"/search"} className="nav-link px-3">Join a Game (WIP)</Link>
                                </Col>
                                <Col xs ={4} className="d-flex justify-content-end">
                                <div className="login-dropdown" data-dropdown>
                                    <button id="login-drop-btn" className="nav-link px-0" data-dropdown-button>Log in</button>
                                    <div className="l-dropdown-menu">
                                        <form className="login-form pb-1 mb-1">
                                            <label htmlFor="email">Email address</label>
                                            <input type="email" name="email" id="email"/>
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password" id="password"/>
                                            <button type="submit" id="login-btn" className="my-2">Log in</button>
                                        </form>
                                        <Link to={"/register"} data-dropdown-button>Don't have an account yet? Sign up!</Link>
                                    </div>
                                </div>
                                </Col>
                            </Nav>
                    </Col>
                </Row>
            </Container>
        </Navbar>
        </>
    )
}