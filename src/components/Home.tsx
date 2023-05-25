import { Container, Row } from "react-bootstrap";
import { formatDate, useAppSelector } from "../hooks/hooks"


export const 
Home = () => {
    const user = useAppSelector((state) => state.user.content);

    return (
        <Container fluid className="pageContent mainContent">
            <Row className="bgWhite m-0 pb-3">
                
            </Row>
        </Container>
    )
}