import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useParams } from "react-router-dom";
import { getDeleteContent } from "../hooks/fetch/gameFetches";
import { IUserData } from "../types/Interfaces";
import { formatDate, useAppSelector } from "../hooks/hooks";
import noPic from "../assets/img/profile_no_pic.jpg"

export const ProfilePage = () => {
    const { id } = useParams<{id: string}>();
    const [ profile, setProfile ] = useState<IUserData>({
        name: "",
        surname: "",
        username: "",
        email: "",
        profilePic: "",
        bio: ""
    });
    const user = useAppSelector((state) => state.user.content);
    const token = user?.accessToken ? user.accessToken : "";

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        setProfile(await getDeleteContent("api/auth/user/" + id, "GET", token))
    }

    const handleChange = (name: string, value: string | Date) => {
        if (value !== undefined) {
            setProfile({...profile, [name]: value});
        }
    }
    return (
        <Container fluid className="pageContent mainContent">
            <Row className="bgWhite m-0 pb-3 px-2">
                <Col md={4}>
                <div className="profilePicContainer profileSection py-3">
                    <img src={profile?.profilePic ? profile?.profilePic: noPic}/>
                </div>
                <div className="text-center mt-3"><em>Personal info (Not visible to public)</em></div>

                <Row className="profileSection py-3 m-0">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                        type="name" 
                        placeholder="Enter name"
                        value={profile?.name ? profile?.name : ""}
                        onChange={(e) => handleChange("name", e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row className="profileSection py-3 m-0">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control 
                        type="surname" 
                        placeholder="Enter surname"
                        value={profile?.surname ? profile?.surname : ""}
                        onChange={(e) => handleChange("surname", e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row className="profileSection pt-3 m-0 border-0">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        value={profile?.email ? profile?.email : ""}
                        onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </Form.Group>
                </Row>

                </Col>
                <Col md={8}>
                    <Row className="profileSection pt-3">
                        {user?.id === profile?.id ? 
                        <input
                        className="profileUsername personalProfile"
                        type="text"
                        value={profile?.username}
                        onChange={(e) => handleChange("username", e.target.value)}
                        /> 
                        : <span className="profileUsername">{profile?.username}</span>}
                        <p>Member since {profile?.registration_date ? formatDate(profile.registration_date) : ""}</p>
                    </Row>
                    {profile?.bio || user?.id === profile?.id ? 
                    <Row className="profileSection py-3">
                        <Col md={3}>
                            <strong>Bio</strong>
                        </Col>

                        <Col md={9}>
                            {user?.id === profile?.id ? 
                            <Form.Control
                            type="text"
                            placeholder="Click to enter a bio about yourself for others to see"
                            value={profile?.bio ? profile.bio : ""}
                            onChange={(e) => handleChange("bio", e.target.value)}
                            /> 
                            : <p>{profile?.bio}</p>}
                        </Col>
                    </Row>
                    : ""}
                    <Row className="profileSection py-3">
                        <Col md={3}>
                            <strong>Enjoys Playing</strong>
                        </Col>

                        <Col md={9}>
                            <Form.Control
                            type="text"
                            placeholder="(not yet implemented)"
                            /* onChange={(e) => handleChange("bio", e.target.value)} */
                            /> 
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end mt-3">
                        {user?.id === profile?.id ? 
                        <Button variant="secondary" className="text-light">
                            Save changes
                        </Button> : ""}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}