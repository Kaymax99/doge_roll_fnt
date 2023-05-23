import { useEffect, useState } from "react"
import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import { GameCard } from "./GameCard"
import { useAppSelector } from "../hooks/hooks"
import { createUpdate, getDeleteContent } from "../hooks/fetch/gameFetches"
import { useNavigate } from "react-router-dom"
import { ProfileMiniCard } from "./ProfileMiniCard"
import { INewCampaign } from "../types/Interfaces"

export const MyGames = () => {
    const [gamesList, setGamesList] = useState([])
    const [showCreateGame, setShowCreateGame] = useState (false);
    const user = useAppSelector((state) => state.user.content);
    const navigate = useNavigate()

    const handleShow = () => setShowCreateGame(true);
    const handleClose = () => setShowCreateGame(false);


    const [newCampaign, setNewCampaign] = useState<INewCampaign>({
        name: "",
        username: user?.username
    })

    useEffect(() => {
        if (!user?.username) {
            navigate("/account/login")
        }
        retrieveGames();
    }, [])

    const retrieveGames = async() => {
        const games = await getDeleteContent("campaigns/user/" + user?.username, "GET")
        setGamesList(games)
    }

    const handleChange = (name: string, value: string) => {
        setNewCampaign({...newCampaign, [name]: value});
    }
    const createNewGame = () => {
        createUpdate("campaigns", "POST" , newCampaign, retrieveGames)
        setShowCreateGame(false)
    }
    
    return (
        <Container>
           <Row>
                <Col md={8} className="mt-3">
                    <div className="d-flex justify-content-between">
                        <h2>Your Games</h2>
                        <Modal show={showCreateGame} onHide={handleClose} className="newGameModal">
                            <Modal.Header>
                                <Modal.Title>
                                    New Campaign
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="text-center">
                                <input
                                type="text"
                                className="newCampaignName mx-auto"
                                value={newCampaign.name}
                                placeholder="Campaign name..."
                                onChange={(e) => handleChange("name", e.target.value)}
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" className="text-light" onClick={createNewGame}>
                                    Create new game
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <Row>
                        {gamesList?.map(function(game, i) {
                            return (
                                <GameCard key={"game-" + i} game={game}/>
                            )
                        })}
                    </Row>
                </Col>
                <Col md={4} className="mt-3">
                    <Button variant="secondary" className="text-light w-100" onClick={() => setShowCreateGame(true)}>
                        Create new game
                    </Button>
                    <ProfileMiniCard user={user}/>
                </Col>
            </Row>
        </Container>
    )
}