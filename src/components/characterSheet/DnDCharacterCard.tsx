import { Button } from "react-bootstrap"
import { DnDCharacterSheet } from "./DnDCharacterSheet"
import { useState } from "react";
import { CharCardProps } from "../../types/Interfaces";
import defaultPic from "../../assets/img/profile_no_pic.jpg"
import { useAppSelector } from "../../hooks/hooks";

export const DnDCharacterCard = ({character, updateChars}: CharCardProps) => {

    const [show, setShow] = useState(false);
    const user = useAppSelector((state) => state.user.content);
    const token = user?.accessToken ? user.accessToken : "";

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Button variant="none"
            className="d-flex align-items-center w-100"
            onClick={handleShow}>
                <img className="charCardPic" src={defaultPic} id={"charImg-" + character.id}/>
                <div className="ps-2">
                    {character.name}
                </div>
            </Button>
            <DnDCharacterSheet 
            character={character} 
            show={show} 
            handleClose={handleClose} 
            updateChars={updateChars} 
            token={token}
            />
        </>
    )
}