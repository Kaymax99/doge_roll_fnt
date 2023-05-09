import { useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";


export const LoginAndRegistration = () => {
    const navigate = useNavigate();

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
            const loginTab = document.getElementById("registerTabBtn");
            if (loginTab) {
                loginTab.className += " activeSign";
            }
        }
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
        const selectedCity = document.getElementById(signType);
        if (selectedCity) {
            selectedCity.style.display = "block";
        }
        e.currentTarget.className += " activeSign";
        navigate("/account/" + signType);
    }

    return (
        <>
        <div id="regPageContainer">
            <div className="bgBlur pt-5">
                <Container id="registrationPage" className="rounded">
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
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter your email address" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <div className="text-center">
                                    <Button variant="primary" className="text-light my-3" type="submit">
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
                                    <Form.Control type="name" placeholder="Enter your name" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="surname">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="surname" placeholder="Enter surname" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="username" placeholder="Enter a nickname" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email address" />
                                    <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <div className="text-center">
                                    <Button variant="primary" className="text-light my-3" type="submit">
                                        Create a new account
                                    </Button>
                                </div>
                            </Form>
                        </Container>
                    </Container>
                </Container>
            </div>
        </div>
        </>
    )

}