import { Component } from "react";
import { Col, Container, Row, Button, Modal } from "react-bootstrap";
import DnDCharacter from "./DnDCharacter";
import { createCharacter } from "../../hooks/fetch/gameFetches";

interface IDnDCharacterSheetProps {
    character?: DnDCharacter
    show: boolean;
    handleClose: () => void;
    updateChars: () => Promise<void>;
}

interface IDnDCharacterSheetState {
    character: DnDCharacter
    isNewCharacter: boolean
  }

const initialState: IDnDCharacterSheetState = {
    character: {},
    isNewCharacter: true
}

export class DnDCharacterSheet extends Component<IDnDCharacterSheetProps,IDnDCharacterSheetState> {

    constructor(props: IDnDCharacterSheetProps) {
        super(props)
        this.state = initialState
        }

    componentDidMount() {
        if (this.props.character) {
            this.setState( {character: this.props.character, isNewCharacter: false})
        } else {
            const newCharacter: DnDCharacter = {}
            this.setState({character: newCharacter})
        }
    }

    checkForCharChange() {
        const character = this.state.character
        return character
    }

    characterChange (name: string, value: any) {
        const oldCharacter = this.checkForCharChange()
        const newCharacter: DnDCharacter = {}
        Object.assign(newCharacter, oldCharacter)
        if (name === "classLevel") {
            if (value > 20) {
                value = 20
            } else if (value < 0) {
                value = 1
            }
        }
        newCharacter[name as keyof DnDCharacter] = value
        this.setState({ character: newCharacter })
    }

    handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(this.state.character)
        this.props.handleClose();
    }
    newCharacter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        createCharacter("", this.state.character,this.props.updateChars)
        this.props.handleClose();
    }

    render() {
        const character = this.checkForCharChange()

        return (
            <Modal show={this.props.show} onHide={this.props.handleClose} className="characterModal">
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="charSheet">
                        <Row className="charSheetInfo">
                            <Col md={3} className="charRndBorder charName">
                                <div className="my-2">
                                    <div className="mt-4">
                                        <input 
                                        type="text" 
                                        id="characterName" 
                                        className="charInputField ps-2 w-100"
                                        value={character.name ? character.name : ""}
                                        onChange={(e) => this.characterChange("name", e.target.value)}
                                        />
                                    </div>
                                    <label className="charLabel">Character Name</label>
                                </div>
                            </Col>
                            <Col md={9} className="charRndBorder">
                                <div className="charDetails my-2">
                                    <Row className="align-items-end">
                                        <Col sm={9}>
                                            <div className="d-flex justify-content-between charInputField">
                                                <input 
                                                type="text"
                                                className="border-0 me-2 w-100 ps-2"
                                                value={character.charClass ? character.charClass : ""}
                                                onChange={(e) => this.characterChange("charClass", e.target.value)}
                                                />
                                                <input 
                                                type="number"
                                                min={1}
                                                max={20}
                                                placeholder="lvl"
                                                className="charLvl border-0"
                                                value={character.classLevel ? character.classLevel : ""}
                                                onChange={(e) => this.characterChange("classLevel", e.target.value)}
                                                />
                                            </div>
                                            <label className="charLabel">Class & Level</label>
                                        </Col>
                                        <Col sm={3}>
                                            <input 
                                            type="text"
                                            className="charInputField ps-2 w-100"
                                            value={character.background ? character.background : ""}
                                            onChange={(e) => this.characterChange("background", e.target.value)}/>
                                            <label className="charLabel">Background</label>
                                        </Col>
                                    </Row>
                                    <Row className="align-items-end">
                                        <Col xs={12} sm={6} md={3}>
                                            <div>
                                                <input 
                                                type="text"
                                                className="charInputField pb-1 ps-2"
                                                value={character.race ? character.race : ""}
                                                onChange={(e) => this.characterChange("race", e.target.value)}/>
                                            </div>
                                            <label className="charLabel">Race</label>
                                        </Col>
                                        <Col xs={12} sm={6} md={3}>
                                            <div className="charInputField border-0">
                                                <input type="text" 
                                                className="charSelect"
                                                value={character.size ? character.size : ""}
                                                onChange={(e) => this.characterChange("size", e.target.value)}/>
                                            </div>
                                            <label className="charLabel">Size</label>
                                        </Col>
                                        <Col xs={12} sm={6} md={3}>
                                            <div className="charInputField border-0">
                                                <input type="text" 
                                                className="charSelect"
                                                value={character.alignment ? character.alignment : ""}
                                                onChange={(e) => this.characterChange("alignment", e.target.value)}/>
                                            </div>
                                            <label className="charLabel">Alignment</label>
                                        </Col>
                                        <Col xs={12} sm={6} md={3} className="">
                                            <div className="charInputField d-flex">
                                                <Col className="flex-grow-1 text-center">
                                                    <input 
                                                    type="number" 
                                                    min={0} 
                                                    className="text-center border-0 w-100"
                                                    value={character.xp ? character.xp : ""}
                                                    onChange={(e) => this.characterChange("xp", e.target.value)}/>
                                                </Col>
                                                <Col xs={1}>/</Col>
                                                <Col className="flex-grow-1 text-center">
                                                    <span>355,000</span>
                                                </Col>
                                            </div>
                                            <label className="charLabel">Exp Points</label>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row className="charSheetMain">

                        </Row>
                    </Container>
            </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between">
                <Button variant="danger" onClick={this.props.handleClose}>
                    {this.state.isNewCharacter? "Discart" : "Undo changes"}
                </Button>
                <Button variant="secondary" className="text-light" onClick={this.state.isNewCharacter? this.newCharacter : this.handleSubmit}>
                {this.state.isNewCharacter? "Create character" : "Save Changes"}
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}