import { Container, Row } from "react-bootstrap"

export const NotFound = () => {
    return (
        <Container fluid className="pageContent mainContent">
            <Row className="bgWhite m-0 pb-3 text-center">
                <h1 className="notFound my-5">404 - Page not found</h1>
            </Row>
        </Container>
        )
}