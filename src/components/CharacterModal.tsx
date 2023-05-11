import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { DnD5ECharacterProfile } from "./characterSheet/DnD5ECharacterProfile";

interface ModalProps{
    show: boolean;
    handleClose: () => void;
}

export const CharacterModal = ({show, handleClose}:ModalProps) => {

  
    return (
      <> 
        <Modal show={show} onHide={handleClose} className="characterModal">
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DnD5ECharacterProfile/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  