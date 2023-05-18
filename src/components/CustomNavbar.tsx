import {Navbar, Container, Nav, NavDropdown, Row, Col} from "react-bootstrap"
import { Link } from "react-router-dom"
import logo from "../assets/img/logo.png"
import {List} from "react-bootstrap-icons"
import { useAppSelector } from "../hooks/hooks"

export const CustomNavbar = () => {

    const user = useAppSelector((state) => state.user.content);
    
    return (
        <>
        <Navbar bg="primary" className="p-0">
            <Container className="position-relative">
                <Row className="justify-content-center w-100 mx-0">
                    <Col xs={12} className="text-md-center py-2 upperNav d-flex align-items-center">
                        <Link to={"/"}>
                            <img src={logo} alt="logo" id="navLogo"/>
                        </Link>
                        <div className="nav-dropdown" data-dropdown>
                            <List className="mobile-nav-btn d-md-none" data-dropdown-button data-mobile-dropdown-button/>
                            <div className="mobile-dropdown-menu d-md-none">
                                <Link to={"/account/register"} className="nav-link">Play Now</Link>
                                <Link to={"/search"} className="nav-link">Join a Game (WIP)</Link>
                                <Link to={"/account/login"} className="nav-link link-login">Log in/Sign up</Link>
                            </div>
                        </div>
                    </Col>
                    <Col md={12} className="d-flex py-2 justify-content-center d-none d-md-flex">
                        <Nav className="w-100">
                            <Col xs ={8} className="d-flex">
                                {/* <Link to={"/account/register"} className="nav-link me-3">Play Now</Link> */}
                                <Link to={"/play"} className="nav-link me-3">Play Now</Link>
                                <Link to={"/search"} className="nav-link px-3">Join a Game (WIP)</Link>
                            </Col>
                            <Col xs ={4} className="d-flex justify-content-end">
                                {!user?.username ? <Link to={"/account/login"} id="login-drop-btn" className="nav-link px-0">Log in/Register</Link> : <Link to={"/account/" + user.username} className="nav-link px-0">{user.username}</Link>}
                            </Col>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </Navbar>

        </>
    )
}