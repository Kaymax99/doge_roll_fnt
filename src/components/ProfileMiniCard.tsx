import { Col, Row } from "react-bootstrap"
import noPic from "../assets/img/profile_no_pic.jpg"
import { formatDate } from "../hooks/hooks"
import { IMiniCardProps } from "../types/Interfaces"

export const ProfileMiniCard = ({user}: IMiniCardProps) => {
    return (
        <Row className="mt-3">
            <Col xs={4} className="myGamesProfilePic">
                <img src={user?.profilePic? user.profilePic : noPic}></img>
            </Col>
            <Col xs={8}>
                <span  className="fw-bold">{user?.username}</span>
                <p>{user?.registration_date ? "Member since: " + formatDate(user?.registration_date) : ""}</p>
            </Col>
        </Row>
    )
}