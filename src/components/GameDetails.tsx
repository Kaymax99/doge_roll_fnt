import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom";
import { createUpdate, getDeleteContent } from "../hooks/fetch/gameFetches";
import { useAppSelector } from "../hooks/hooks";
import placeholder from "../assets/img/camp-card-placeholder.jpg"
import { PlayFill } from "react-bootstrap-icons"
import { DnDCharacterCard } from "./characterSheet/DnDCharacterCard";
import { ProfileMiniCard } from "./ProfileMiniCard";
import { ICampaignDetails } from "../types/Interfaces";
import { DnDCharacterSheet } from "./characterSheet/DnDCharacterSheet";

export const GameDetails = () => {
    const { campaignId } = useParams<{campaignId: string}>();
    const [ campaignDetails, setCampaignDetails] = useState<ICampaignDetails>( {
        name: "",
        nextSession: "",
        image: "",
        description: ""
    });
    const [charactersArray, setCharactersArray] = useState([])
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.content);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchGame();
        retrieveCharacters();
    }, [])

    const fetchGame = async () => {
        const game = await getDeleteContent("campaigns/" + campaignId, "GET")
        if (!game || game?.username !== user?.username) {
            navigate("/404");
        } else if (game) {
            setCampaignDetails(game);
        }
    }

    const retrieveCharacters = async () => {
        const characters = await getDeleteContent("characters/filter/campaign/" + campaignId, "GET");
        if (characters) {
            setCharactersArray(characters.sort((a: { id: number; },b: { id: number; }) => (a.id > b.id) ? 1: -1))
        }
    }
    const handleChange = (name: string, value: string | Date) => {
        if (value !== undefined) {
            setCampaignDetails({...campaignDetails, [name]: value});
        }
    }
    const saveChanges = () => {
        createUpdate("campaigns/" + campaignId, "PUT", campaignDetails, fetchGame)

    }
    const deleteGame = async() => {
        handleClose()
        await getDeleteContent("campaigns/" + campaignId, "DELETE")
        navigate("/campaigns/search")
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col xs={12} md={8}>
                    <div className="campaignHead">
                        <div>
                            <img src={campaignDetails?.image? campaignDetails.image : placeholder}/>
                        </div>
                        <input
                        type="text"
                        value={campaignDetails?.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="campaignName w-100"
                        />
                    </div>
                    <div className="campaignBody mt-3">
                        <div className="d-flex justify-content-between">
                            <Button variant="secondary" className="text-light d-flex align-items-center campaignActions">
                                <Link to={"/game/editor/" + campaignId}>
                                    <PlayFill className="me-1"/>
                                    <span>Launch game</span>
                                </Link>
                            </Button>
                            <Button variant="danger" className="campaignActions" onClick={handleShow}>
                                Delete Game
                            </Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Warning!</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>This action is irreversible and will also delete ALL characters and tokens associated with this game, are you sure you want to proceed?</Modal.Body>
                                <Modal.Footer className="d-flex justify-content-between">
                                <Button variant="primary" onClick={handleClose} className="text-light">
                                    Back to safety
                                </Button>
                                <Button variant="danger" onClick={deleteGame}>
                                    Confirm
                                </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        <div className="mt-3 pb-3 borderBottom">
                            <h4>Next Game Will Be</h4>
                            <input
                            type="date"
                            value={campaignDetails.nextSession}
                            onChange={(e) => handleChange("nextSession", e.target.value)}
                            />
                        </div>
                        <div className="my-3 pb-3 borderBottom">
                            <textarea
                            className="w-100 rounded campaignDescription"
                            value={campaignDetails.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            rows={5}
                            />
                        </div>
                        <div className="d-flex justify-content-end mb-3">
                            <Button variant="secondary" className="text-light" onClick={saveChanges}>
                                Save
                            </Button>
                        </div>
                    </div> 
                </Col>
                <Col xs={12} md={4}>
                    <div className="mb-3 creatorDetails">
                        <h5>Created by</h5>
                        <ProfileMiniCard user={user}/>
                    </div>
                    <div className="bgGray p-3">
                        <h3>Campaign Characters</h3>
                        <div className="text-center mb-1">
                            <Button variant="secondary" className="my-2 mx-auto text-light" onClick={handleShow}>Create new Character</Button>
                        </div>
                        <DnDCharacterSheet show={show} handleClose={handleClose} character={undefined} updateChars={retrieveCharacters} gameId={campaignId}/>
                        {charactersArray?.map( function(char, i) {
                            return (
                                <DnDCharacterCard
                                key={"character-" + i} character={char} updateChars={retrieveCharacters} />
                            )
                        })}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}