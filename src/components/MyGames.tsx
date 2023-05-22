import { useEffect, useState } from "react"
import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import { GameCard } from "./GameCard"
import { useAppSelector } from "../hooks/hooks"
import { createUpdate, fetchContent } from "../hooks/fetch/gameFetches"

export interface INewCampaign {
    name: string,
    username: string | undefined
}


export const MyGames = () => {
    const [gamesList, setGamesList] = useState([])
    const [showCreateGame, setShowCreateGame] = useState (false);
    const user = useAppSelector((state) => state.user.content);

    const handleShow = () => setShowCreateGame(true);
    const handleClose = () => setShowCreateGame(false);


    const [newCampaign, setNewCampaign] = useState<INewCampaign>({
        name: "",
        username: user?.username
    })

    useEffect(() => {
        retrieveGames();
    }, [])

    const retrieveGames = async() => {
        const games = await fetchContent("campaigns/all")
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
                <Col md={9}>
                    <div className="d-flex justify-content-between mt-3">
                        <h2>Your Games</h2>
                        <Button variant="secondary" className="text-light" onClick={() => setShowCreateGame(true)}>
                            Create new game
                        </Button>
                        <Modal show={showCreateGame} onHide={handleClose}>
                            <Modal.Header>
                                <Modal.Title>
                                    New Campaign
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="text-center">
                                <input
                                type="text"
                                className="campaignName mx-auto"
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
                    <Row className="justify-content-around">
                        {gamesList?.map(function(game, i) {
                            return (
                                <GameCard key={"game-" + i} game={game}/>
                            )
                        })}
                    </Row>
                </Col>
                <Col md={3}>

                </Col>
            </Row>
        </Container>
    )
}