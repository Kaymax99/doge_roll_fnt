import { Col, Row } from "react-bootstrap"
import noPic from "../assets/img/profile_no_pic.jpg"
import { formatDate } from "../hooks/hooks"
import { IMiniCardProps } from "../types/Interfaces"
import { Link } from "react-router-dom"

export const ProfileMiniCard = ({user}: IMiniCardProps) => {
    return (
        <Row className="mt-3">
            <Col xs={4} className="myGamesProfilePic">
                <div className="miniPic" style={{backgroundImage:`url("${user?.profilePic? user.profilePic : noPic}")`}}></div>
                {/* <img src={user?.profilePic? user.profilePic : noPic}></img> */}
            </Col>
            <Col xs={8}>
                <Link to={"/users/" + user?.id}><span  className="fw-bold">{user?.username}</span></Link>
                <p>{user?.registration_date ? "Member since: " + formatDate(user?.registration_date) : ""}</p>
            </Col>
        </Row>
    )
}