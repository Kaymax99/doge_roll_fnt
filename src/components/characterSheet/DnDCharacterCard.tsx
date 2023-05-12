import { Button } from "react-bootstrap"
import DnDCharacter from "./DnDCharacter"
import { DnDCharacterSheet } from "./DnDCharacterSheet"
import { useState } from "react";

interface CharCardProps {
    character: DnDCharacter;
    updateChars: () => Promise<void>;
}


export const DnDCharacterCard = ({character, updateChars}: CharCardProps) => {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Button 
            className="d-flex align-items-center w-100"
            onClick={handleShow}>
                <img src="https://placekitten.com/50/50"/>
                <div className="ps-2">
                    {character.name}
                </div>
            </Button>
            <DnDCharacterSheet show={show} handleClose={handleClose} character={character} updateChars={updateChars}/>
        </>
    )
}