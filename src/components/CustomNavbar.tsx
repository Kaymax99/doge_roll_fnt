import {Navbar, Container, Nav, Row, Col, Button} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/img/logo.png"
import {List} from "react-bootstrap-icons"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"

export const CustomNavbar = () => {

    const user = useAppSelector((state) => state.user.content);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch({type: "LOG_OUT", payload: null})
        navigate("/")
    }
    
    return (
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
                                <Link to={"/"} className="nav-link">Home</Link>
                                {!user?.username ? <Link to={"/account/register"} className="nav-link me-3">Play Now</Link> : ""}
                                {!user?.username ? <Link to={"/search"} className="nav-link disabled nav-border">Join a Game</Link> : <Link to={"/campaigns/search"} className="nav-link nav-border">My Games</Link>}
                                {!user?.username ? <Link to={"/account/login"} className="nav-link link-login">Log in/Sign up</Link> : 
                                    <div>
                                        <Link to={"/account/" + user.username} className="nav-link">{user.username}</Link>
                                        <Button className="signOutBtn" onClick={logout}>Sign out</Button>
                                    </div>
                                }
                            </div>
                        </div>
                    </Col>
                    <Col md={12} className="d-flex py-2 justify-content-center d-none d-md-flex">
                        <Nav className="w-100">
                            <Col xs ={8} className="d-flex">
                                <Link to={"/"} className="nav-link me-3">Home</Link>
                                {!user?.username ? <Link to={"/account/register"} className="nav-link me-3">Play Now</Link> : ""}
                                {!user?.username ? <Link to={"/search"} className="nav-link px-3 disabled">Join a Game</Link> : <Link to={"/campaigns/search"} className="nav-link px-3">My Games</Link>}
                            </Col>
                            <Col xs ={4} className="d-flex justify-content-end">
                                {!user?.username ? <Link to={"/account/login"} id="login-drop-btn" className="nav-link px-0">Log in/Register</Link> : 
                                    <div className="logged-dropdown" data-dropdown>
                                        <button id="login-drop-btn" className="nav-link px-0" data-dropdown-button>{user.username}</button>
                                        <div className="l-dropdown-menu">
                                            <Link to={"/account/" + user.username} className="nav-link">My Account</Link>
                                            <Button className="signOutBtn" onClick={logout}>Sign out</Button>
                                        </div>
                                    </div>
                                }
                            </Col>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    )
}