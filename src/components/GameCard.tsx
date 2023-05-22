import { Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import placeholder from "../assets/img/camp-card-placeholder.jpg"

interface GameCardProps {
    game: {
        id: number,
        name: string,
        nextSession: Date,
        image: string,
    }
}

export const GameCard = ({game}: GameCardProps) => {
    return (
        <Col xs={12} sm={6} xl={4} className="my-2">
            <div className="rounded gameCardShadow p-2">
                <div className="imgContainer text-center mb-2">
                    <img src={game?.image? game.image : placeholder} alt="Campaign" className="cardImage" />
                </div>
                <div>
                    <Link to={"/campaigns/details/" + game.id} className="gameName"><h3 className="text-secondary">{game?.name}</h3></Link>
                    <p className="mb-2">Next Game</p>
                    <p className="mb-2">{game?.nextSession? game.nextSession.toString() : "Not Scheduled"}</p>
                    <Link to={"/game/editor/" + game.id} className="text-secondary launchBtn">Launch Game</Link>
                </div>
            </div>
        </Col>
    )
}