import { Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import placeholder from "../assets/img/camp-card-placeholder.jpg"
import { formatDate } from "../hooks/hooks"
import { GameCardProps } from "../types/Interfaces"

export const GameCard = ({game}: GameCardProps) => {
    return (
        <Col xs={12} sm={6} className="my-3">
            <div className="rounded gameCardShadow p-2">
                <div className="imgContainer text-center mb-2">
                    <img src={game?.image? game.image : placeholder} alt="Campaign" className="cardImage" />
                </div>
                <div className="gameCardBody">
                    <Link to={"/campaigns/details/" + game.id} className="gameName text-secondary">{game?.name}</Link>
                    <p className="mb-2">Next Game</p>
                    <p className="mb-2">{game?.nextSession ? formatDate(game?.nextSession) : "Not Scheduled"}</p>
                    <Link to={"/game/editor/" + game.id} className="text-secondary launchBtn">Launch Game</Link>
                </div>
            </div>
        </Col>
    )
}