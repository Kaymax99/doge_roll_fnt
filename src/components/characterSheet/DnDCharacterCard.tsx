import { Button } from "react-bootstrap"
import DnDCharacter from "./DnDCharacter"
import { DnDCharacterSheet } from "./DnDCharacterSheet"

interface CharCardProps {
    show: boolean;
    handleShow: () => void;
    handleClose: () => void;
}

const character: DnDCharacter  = {
    name: "Egg",
    classLevel: "1",
    background: "EGGER"
}

export const DnDCharacterCard = ({handleShow, show, handleClose}: CharCardProps) => {
    return (
        <>
            <Button 
            className="d-flex align-items-center w-100"
            onClick={handleShow}>
                <img src="https://placekitten.com/50/50"/>
                <div className="ps-2">
                    Test
                </div>
            </Button>
            <DnDCharacterSheet show={show} handleClose={handleClose} character={character}/>
        </>
    )
}