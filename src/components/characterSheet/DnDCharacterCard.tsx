import { Button } from "react-bootstrap"
import { DnDCharacterSheet } from "./DnDCharacterSheet"
import { useState } from "react";
import { CharCardProps } from "../../types/Interfaces";

export const DnDCharacterCard = ({character, updateChars}: CharCardProps) => {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Button variant="none"
            className="d-flex align-items-center w-100"
            onClick={handleShow}>
                <img src="https://placekitten.com/50/50" id={"charImg-" + character.id}/>
                <div className="ps-2">
                    {character.name}
                </div>
            </Button>
            <DnDCharacterSheet 
            character={character} 
            show={show} 
            handleClose={handleClose} 
            updateChars={updateChars} 
            />
        </>
    )
}