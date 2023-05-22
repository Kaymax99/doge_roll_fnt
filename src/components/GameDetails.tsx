import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import { createUpdate, fetchContent } from "../hooks/fetch/gameFetches";
import { useAppSelector } from "../hooks/hooks";
import placeholder from "../assets/img/camp-card-placeholder.jpg"
import { PlayFill } from "react-bootstrap-icons"

interface ICampaignDetails {
    name: string,
    nextSession: string,
    image: string,
    description: string
}

export const GameDetails = () => {
    const { campaignId } = useParams<{campaignId: string}>();
    const [ campaignDetails, setCampaignDetails] = useState<ICampaignDetails>( {
        name: "",
        nextSession: "",
        image: "",
        description: ""

    });
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.content);

    useEffect(() => {
        fetchGame()
    }, [])

    const fetchGame = async () => {
        const game = await fetchContent("campaigns/" + campaignId)
        if (!game || game?.username !== user?.username) {
            navigate("/404")
        } else if (game) {
            setCampaignDetails(game)
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
                                <PlayFill className="me-1"/>
                                <span>Launch game</span>
                            </Button>
                            <Button variant="danger" className="campaignActions">
                                Delete Game
                            </Button>
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
                <Col xs={12} md={8}>

                </Col>
            </Row>
        </Container>
    )
}