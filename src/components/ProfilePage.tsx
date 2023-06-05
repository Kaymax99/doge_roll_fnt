import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useParams } from "react-router-dom";
import { createUpdate, getDeleteContent } from "../hooks/fetch/gameFetches";
import { IUserData } from "../types/Interfaces";
import { formatDate, useAppDispatch, useAppSelector } from "../hooks/hooks";
import noPic from "../assets/img/profile_no_pic.jpg"
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { LOG_IN } from "../redux/reducers/userReducer";

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
    useDocumentTitle(`${user?.username ? user.username : "Unkown"} | DogeRoll`);
    const dispatch = useAppDispatch();

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        setProfile(await getDeleteContent("api/auth/user/" + id, "GET", token))
    }

    const updateUser = async () => {
        await createUpdate("api/auth/user/" + id, "PUT" , profile, token, fetchUser)
        const updatedUser: IUserData = {
            id: user?.id,
            name: profile.name,
            surname: profile.surname,
            username: profile.username,
            profilePic: profile.profilePic,
            registration_date: user?.registration_date,
            bio: profile.bio,
            email: profile.email,
            accessToken: user?.accessToken
        }
        dispatch({type: LOG_IN, payload: updatedUser})
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
                    <div className="profilePic" style={{backgroundImage:`url("${profile?.profilePic ? profile?.profilePic: noPic}")`}}></div>
                    {user?.id === profile?.id ? 
                    <Form.Control
                    className="mt-2"
                    type="text" 
                    placeholder="Enter profile pic URL"
                    value={profile?.profilePic ? profile?.profilePic : ""}
                    onChange={(e) => handleChange("profilePic", e.target.value)}
                    /> : ""}
                </div>
                {user?.id === profile?.id ? 
                <div>
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
                </div>
                : ""}

                </Col>
                <Col md={8}>
                    <Row className="profileSection pt-3">
                        {user?.id === profile?.id ? 
                        <Form.Control
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
                            <textarea
                            rows={5}
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
                            {user?.id === profile?.id ? 
                            <Form.Control
                            type="text"
                            placeholder="(not yet implemented)"
                            />
                            : <p>(not yet implemented)</p>}
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end mt-3">
                        {user?.id === profile?.id ? 
                        <Button variant="secondary" className="text-light" onClick={updateUser}>
                            Save all changes
                        </Button> : ""}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}