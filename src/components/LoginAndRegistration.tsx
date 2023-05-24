import { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { LOG_IN } from "../redux/reducers/userReducer";
import { IAccountData, IUserData, LoginData } from "../types/Interfaces";


export const LoginAndRegistration = () => {
    const [regData, setRegData] = useState<IAccountData>({
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
    })
    const [logData, setLogData] = useState({
        username: "",
        password: "",
    })
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        hideTabContent();
        removeActiveClass();
        const tabcontent = Array.from(document.getElementsByClassName("tabcontent") as HTMLCollectionOf<HTMLElement>);
        if (window.location.href.slice(22) === "account/login") {
            tabcontent[0].style.display = "block";
            const loginTab = document.getElementById("loginTabBtn");
            if (loginTab) {
                loginTab.className += " activeSign";
            }
        } else if (window.location.href.slice(22) === "account/register") {
            tabcontent[1].style.display = "block";
            const registerTab = document.getElementById("registerTabBtn");
            if (registerTab) {
                registerTab.className += " activeSign";
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.href]) 

    const hideTabContent = () => {
        let i;
        // Get all elements with class="tabcontent" and hide them
        const tabcontent = Array.from(document.getElementsByClassName("tabcontent") as HTMLCollectionOf<HTMLElement>);
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
    }
    const removeActiveClass = () => {
        let i;
        // Get all elements with class="tablinks" and remove the class "activeSign"
        const tablinks: HTMLCollectionOf<Element> = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" activeSign", "");
        }
    }

    const openSign = (e: React.MouseEvent<HTMLElement>, signType: string) => {  
        hideTabContent();
        removeActiveClass();

        // Show the current tab, and add an "activeSign" class to the button that opened the tab
        const selectedSign = document.getElementById(signType);
        if (selectedSign) {
            selectedSign.style.display = "block";
        }
        e.currentTarget.className += " activeSign";
        navigate("/account/" + signType);
    }

    const handleChange = (propertyName: string, propertyValue: string, type: string) => {
        if (type === "register") {
            setRegData({ ...regData, [propertyName]: propertyValue });
        } else if (type === "login") {
            setLogData({ ...logData, [propertyName]: propertyValue })
        }
      }
    const handleSubmit = async (e: React.SyntheticEvent, action: string, data: IAccountData | LoginData) => {
        e.preventDefault();
        accountActions(data, action);
    }
    
    const baseUrl = `http://localhost:8080/api/auth/`;

    const accountActions = async (data: IAccountData | LoginData, endpoint: string) => {
        try {
            const res = await fetch(baseUrl + endpoint, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (res.ok) {
                if (endpoint === "register") {
                    accountActions(data, "login")
                } else {
                    const userData = await res.json();

                    /* console.log(userData) */
                    const newUser: IUserData = {
                        id: userData.id,
                        name: userData.name,
                        surname: userData.surname,
                        username: userData.username,
                        profilePic: userData.profilePic,
                        registration_date: userData.registration_date,
                        bio: userData.bio,
                        email: userData.email,
                        accessToken: userData.tokenType + " " + userData.accessToken,
                    }
                    dispatch({type: LOG_IN, payload: newUser})
                    navigate("/");
                }
            }
        } catch (error) {
            console.log("FATAL ERROR: ", error)
        }
    }

    return (
        <Container fluid id="regPageContainer" className="pageContent mainContent">
            <Row id="registrationPage" className="m-0 pb-3">
                <Container>
                    <Container className="p-0 my-3 mb-5 rounded">
                        <div className="tab rounded-top">
                                <button id="loginTabBtn" className="tablinks rounded-top" onClick={(event: React.MouseEvent<HTMLElement>) => openSign(event, "login")}>Login</button>
                                <button id="registerTabBtn" className="tablinks rounded-top" onClick={(event: React.MouseEvent<HTMLElement>) => openSign(event, "register")}>Register</button>
                        </div>

                        <Container id="login" className="tabcontent">
                            <div className="text-center my-3">
                                <h1 className="text-secondary headingMsg">Welcome back!</h1>
                            </div>
                            <Form>
                                <Form.Group className="mb-3" controlId="logInEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control 
                                    type="username" 
                                    placeholder="Enter your username"
                                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleChange("username", e.target.value, "login")}
                                     />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="logInPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleChange("password", e.target.value, "login")}
                                     />
                                </Form.Group>
                                <div className="text-center">
                                    <Button 
                                    variant="primary" 
                                    className="text-light my-3" 
                                    type="submit"
                                    onClick={(e) => handleSubmit(e, "login", logData)}>
                                        Login
                                    </Button>
                                </div>
                            </Form>
                        </Container>

                        <Container id="register" className="tabcontent">
                            <div className="text-center my-3">
                                <h1 className="text-secondary headingMsg">Welcome to DogeRoll!</h1>
                                <span>Please fill out the following form to create your account</span>
                            </div>
                            <Form>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control 
                                    type="name"
                                    placeholder="Enter your name"
                                    value={regData.name}
                                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleChange("name", e.target.value, "register")}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="surname">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control 
                                    type="surname" 
                                    placeholder="Enter surname" 
                                    value={regData.surname}
                                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleChange("surname", e.target.value, "register")}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control 
                                    type="username"
                                    value={regData.username}
                                    placeholder="Enter a nickname"
                                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleChange("username", e.target.value, "register")}
                                    />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control 
                                    type="email"
                                    value={regData.email}
                                    placeholder="Enter email address"
                                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleChange("email", e.target.value, "register")}
                                    />
                                    <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                    type="password"
                                    value={regData.password}
                                    placeholder="Password"
                                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleChange("password", e.target.value, "register")}
                                    />
                                </Form.Group>
                                <div className="text-center">
                                    <Button 
                                    variant="primary" 
                                    className="text-light my-3" 
                                    type="submit"
                                    onClick={(e) => handleSubmit(e, "register", regData)}
                                    >
                                        Create a new account
                                    </Button>
                                </div>
                            </Form>
                        </Container>
                    </Container>
                </Container>
            </Row>
        </Container>
    )

}