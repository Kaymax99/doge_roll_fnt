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
    const token = user?.accessToken ? user.accessToken : "";
    const [showDelete, setShowDelete] = useState(false);
    const [showCharModal, setShowCharModal] = useState(false);

    const handleCloseCharModal = () => setShowCharModal(false);
    const handleShowCharModa = () => setShowCharModal(true);

    const handleCloseDel = () => setShowDelete(false);
    const handleShowDel = () => setShowDelete(true);

    useEffect(() => {
        fetchGame();
        retrieveCharacters();
    }, [])

    const fetchGame = async () => {
        const game = await getDeleteContent("campaigns/" + campaignId, "GET", token)
        /* console.log(game) */
        if (!game || game?.user.id !== user?.id) {
            navigate("/404");
        } else if (game) {
            setCampaignDetails(game);
        }
    }

    const retrieveCharacters = async () => {
        const characters = await getDeleteContent("characters/filter/campaign/" + campaignId, "GET", token);
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
        createUpdate("campaigns/" + campaignId, "PUT", campaignDetails, fetchGame, token)

    }
    const deleteGame = async() => {
        handleCloseDel()
        await getDeleteContent("campaigns/" + campaignId, "DELETE", token)
        navigate("/campaigns/search")
    }

    return (
        <Container fluid className="pageContent mainContent">
            <Row className="bgWhite m-0 py-3 px-1">
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
                            <Button variant="danger" className="campaignActions" onClick={handleShowDel}>
                                Delete Game
                            </Button>
                            <Modal show={showDelete} onHide={handleCloseDel}>
                                <Modal.Header closeButton>
                                <Modal.Title>Warning!</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>This action is irreversible and will also delete ALL characters and tokens associated with this game, are you sure you want to proceed?</Modal.Body>
                                <Modal.Footer className="d-flex justify-content-between">
                                <Button variant="primary" onClick={handleCloseDel} className="text-light">
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
                            value={campaignDetails.nextSession ? campaignDetails.nextSession : ""}
                            onChange={(e) => handleChange("nextSession", e.target.value)}
                            />
                        </div>
                        <div className="my-3 pb-3 borderBottom">
                            <textarea
                            className="w-100 rounded campaignDescription"
                            value={campaignDetails.description ? campaignDetails.description : ""}
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
                            <Button variant="secondary" className="my-2 mx-auto text-light" onClick={handleShowCharModa}>Create new Character</Button>
                        </div>
                        <DnDCharacterSheet show={showCharModal} handleClose={handleCloseCharModal} character={undefined} updateChars={retrieveCharacters} gameId={campaignId} token={token}/>
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