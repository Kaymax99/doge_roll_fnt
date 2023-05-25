import { DnDCharacterSheet } from "./DnDCharacterSheet"
import { useState } from "react";
import { CharCardProps } from "../../types/Interfaces";
import defaultPic from "../../assets/img/profile_no_pic.jpg"
import { useAppSelector } from "../../hooks/hooks";

export const DnDCharacterCard = ({character, updateChars, Cssclasses}: CharCardProps) => {

    const [show, setShow] = useState(false);
    const user = useAppSelector((state) => state.user.content);
    const token = user?.accessToken ? user.accessToken : "";

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const classes = Cssclasses ? Cssclasses + " ps-2" : "ps-2"

    return (
        <>
            <div
            className="d-flex align-items-center gameSideBarEntry mx-2 py-1"
            onClick={handleShow}>
                <img className="charCardPic ms-2" src={defaultPic} id={"charImg-" + character.id}/>
                <div className={classes}>
                    {character.name}
                </div>
            </div>
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