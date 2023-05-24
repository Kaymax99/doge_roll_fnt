import { Button, Col, Container, Row } from "react-bootstrap"
import logo from "../assets/img/logo.png"
import { Facebook, Instagram, Linkedin, Github } from "react-bootstrap-icons"

export const CustomFooter = () => {
    return (
        <Container fluid className="pageContent footer">
            <footer className="bgPrimary p-2">
                <Row className="d-flex align-items-center justify-content-between text-center m-0">
                    <Col xs={12} sm={4} className="mb-2">
                        <p className="mb-1">&copy;2023 Simone Basile</p>
                        <span className="mb-1">All Rights Reserved</span>
                    </Col>
                    <Col xs={0} sm={4} className="d-none d-sm-block">
                        <a href="#"><img src={logo} className="footerLogo"/></a>
                    </Col>
                    <Col xs={12} sm={4} className="mb-2">
                        <Button>
                            <Facebook/>
                        </Button>
                        <Button>
                            <Instagram/>
                        </Button>
                        <Button>
                            <Linkedin/>
                        </Button>
                        <Button>
                            <Github/>
                        </Button>
                    </Col>
                </Row>
            </footer>
        </Container>
    )
}