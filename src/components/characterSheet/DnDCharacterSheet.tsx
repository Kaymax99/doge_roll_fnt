import { Component } from "react";
import { Col, Container, Row, Button, Modal, Form } from "react-bootstrap";
import DnDCharacter from "./DnDCharacter";
import { createUpdate, getDeleteContent } from "../../hooks/fetch/gameFetches";
import { StatBox } from "./components/StatBox";
import { StatRow } from "./components/StatRow";
import { setCharMaxXP, setCharProficiency } from "./StatsLogic";
import { Skill } from "./components/Skill";
import { StatBoxCombat } from "./components/StatBoxCombat";
import heart from "../../assets/img/character-sheet/heart-frame.png";
import { DeathSave } from "./components/DeathSave";
import { Coins } from "./components/Coins";
import noPic from "../../assets/img/profile_no_pic.jpg"
import charaFrame from "../../assets/img/character-sheet/border.png"
import { rollSelected } from "../../hooks/diceRolling";

interface IDnDCharacterSheetProps {
    character?: DnDCharacter
    show: boolean;
    handleClose: () => void;
    updateChars: () => Promise<void>;
    gameId?: string | undefined;
    token: string;
}

interface IDnDCharacterSheetState {
    character: DnDCharacter
    isNewCharacter: boolean
    rollsHistory: string[]
    showRollHistory: boolean
  }

const initialState: IDnDCharacterSheetState = {
    character: {},
    isNewCharacter: true,
    rollsHistory: [""],
    showRollHistory: false
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
                value = "20"
            } else if (value < 0) {
                value = "1"
            }
        }
        newCharacter[name as keyof DnDCharacter] = value
        this.setState({ character: newCharacter })
    }

    updateCharacter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        createUpdate("characters/" + this.state.character.id?.toString(), "PUT" , this.state.character,this.props.token, this.props.updateChars)
        this.props.handleClose();
    }
    discardChanges = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (this.props.character) {
            this.setState( {character: this.props.character})
        }
        this.props.handleClose()
    }
    newCharacter = (e: React.MouseEvent<HTMLButtonElement>) => {
        const newCharacter: DnDCharacter = {}
        e.preventDefault();
        createUpdate("characters/campaign/" + this.props.gameId, "POST" , this.state.character,this.props.token, this.props.updateChars)
        
        this.setState({character: newCharacter});
        this.props.handleClose();
    }
    deleteCharacter = async (id: number | undefined) => {
        if (id) {
            await getDeleteContent("characters/" + id, "DELETE", this.props.token)
        }
        this.props.updateChars();
        this.props.handleClose();

    }

    render() {
        const character = this.checkForCharChange()
        const rollHistClass = this.state.showRollHistory ? "rollsHistory showHist" : "rollsHistory"
        const addDiceToHistory = (result: string) => {
            if (this.state.rollsHistory?.length) {
                if (this.state.rollsHistory?.length < 10) {
                    this.state.rollsHistory?.push(result)
                } else {
                    this.state.rollsHistory.shift()
                    this.state.rollsHistory?.push(result)
                }
            }
            this.forceUpdate()
        }

        return (
            <Modal show={this.props.show} onHide={this.props.handleClose} className="characterModal">
                <Modal.Header closeButton className="d-flex justify-content-between">
                    <Modal.Title className="mb-2 me-3">{character ? character.name : "New Character"}</Modal.Title>
                    {this.state.isNewCharacter? "" : 
                    <Button variant="danger" onClick={this.discardChanges}>
                        Undo recent changes
                    </Button>
                    }
                </Modal.Header>
                <Modal.Body>
                    <Container className="charSheet">
                        <Row className="w-100 m-0 position-relative">
                            <div className="mb-2 charaImageContainer">
                                <div style={{backgroundImage: `url(${character.picture ? character.picture : noPic})`}}></div>
                                <img src={charaFrame} alt="Character Frame"/>
                            </div>
                            <div className="py-2 text-center mb-3">
                                <Form.Control
                                type="text"
                                value={character.picture ? character.picture : ""}
                                placeholder="Character Image URL"
                                onChange={(e) => this.characterChange("picture", e.target.value)}
                                className="charInput charImageUrl"
                                />
                            </div>
                            <div className="mx-auto text-center mb-2">
                                <Button className="text-light" onClick={() => this.setState({showRollHistory: !this.state.showRollHistory})}>Show Roll History</Button>
                            </div>
                            <div className={rollHistClass}>
                                <div>
                                    {this.state.rollsHistory? this.state.rollsHistory.map(function(result, i) {
                                        return (
                                            <p className="m-0" key={"RollHistory-" + i}>{result}</p>
                                        )
                                    }) : ""}
                                </div>
                                <label>Rolls History</label>
                            </div>
                        </Row>
                        <Row className="charSheetInfo">
                            <Col md={3} className="charRndBorder charName">
                                <div className="my-2">
                                    <div className="mt-4">
                                        <input 
                                        type="text" 
                                        id="characterName" 
                                        className="charInputField ps-2 w-100 charInput"
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
                                            <div className="d-flex justify-content-between charInputField charInput ">
                                                <input 
                                                type="text"
                                                className="border-0 me-2 w-100 ps-2 charInput"
                                                value={character.charClass ? character.charClass : ""}
                                                onChange={(e) => this.characterChange("charClass", e.target.value)}
                                                />
                                                <input 
                                                type="number"
                                                min={1}
                                                max={20}
                                                placeholder="lvl"
                                                className="charLvl border-0 charInput"
                                                value={character.classLevel ? character.classLevel : ""}
                                                onChange={(e) => this.characterChange("classLevel", e.target.value)}
                                                />
                                            </div>
                                            <label className="charLabel">Class & Level</label>
                                        </Col>
                                        <Col sm={3}>
                                            <input 
                                            type="text"
                                            className="charInputField ps-2 w-100 charInput"
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
                                                className="charInputField ps-2 charInput"
                                                value={character.race ? character.race : ""}
                                                onChange={(e) => this.characterChange("race", e.target.value)}/>
                                            </div>
                                            <label className="charLabel">Race</label>
                                        </Col>
                                        <Col xs={12} sm={6} md={3}>
                                            <div className="charInputField border-0">
                                                <input type="text" 
                                                className="charSelect charInput"
                                                value={character.size ? character.size : ""}
                                                onChange={(e) => this.characterChange("size", e.target.value)}/>
                                            </div>
                                            <label className="charLabel">Size</label>
                                        </Col>
                                        <Col xs={12} sm={6} md={3}>
                                            <div className="charInputField border-0">
                                                <input type="text" 
                                                className="charSelect charInput"
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
                                                    className="text-center border-0 w-100 charInput"
                                                    value={character.xp ? character.xp : ""}
                                                    onChange={(e) => this.characterChange("xp", e.target.value)}/>
                                                </Col>
                                                <Col xs={1}>/</Col>
                                                <Col className="flex-grow-1 text-center">
                                                    <span>{setCharMaxXP(character.classLevel)? setCharMaxXP(character.classLevel) : "300"}</span>
                                                </Col>
                                            </div>
                                            <label className="charLabel">Exp Points</label>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row className="charSheetMain mt-2">
                            <Col md={6} xl={4}>
                                <Row>
                                    <Col xs={5} className="mx-auto statBoxContainer">
                                        <div className='charBox gray pb-0'>
                                            <StatBox
                                            label='Strength'
                                            name='strength'
                                            value={character.strength}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            defaultStat="(Str)"
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}/>
                                            <StatBox
                                            label='Dexterity'
                                            name='dexterity'
                                            value={character.dexterity}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            defaultStat="(Str)"
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}/>
                                            <StatBox
                                            label='Constitution'
                                            name='constitution'
                                            value={character.constitution}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            defaultStat="(Str)"
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}/>
                                            <StatBox
                                            label='Intelligence'
                                            name='intelligence'
                                            value={character.intelligence}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            defaultStat="(Str)"
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}/>
                                            <StatBox
                                            label='Wisdom'
                                            name='wisdom'
                                            value={character.wisdom}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            defaultStat="(Str)"
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}/>
                                            <StatBox
                                            label='Charisma'
                                            name='charisma'
                                            value={character.charisma}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            defaultStat="(Str)"
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={7}>
                                        <StatRow
                                        label="Inspiration"
                                        name="inspiration"
                                        value={character.inspiration}
                                        onChange={(name: string, value: any) => {
                                            this.characterChange(name, value)
                                          }}
                                        />
                                        <StatRow
                                        label='Proficiency'
                                        name='proficiencyBonus'
                                        value={setCharProficiency(character.classLevel)}
                                        onChange={(name: string, value: any) => {
                                        this.characterChange(name, value)
                                        }}
                                        cssClass="rounded"
                                        />
                                    <div className="charBox">
                                        <div className="charSaveThrows">
                                            <Skill
                                            name="strSave"
                                            label="Strength"
                                            value={character.strength}
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            proficient={character.strSaveProficient}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            defaultStat="(Str)"
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="dexSave"
                                            label="Dexterity"
                                            value={character.dexterity}
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            proficient={character.dexSaveProficient}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            defaultStat="(Dex)"
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="conSave"
                                            label="Constitution"
                                            value={character.constitution}
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            proficient={character.conSaveProficient}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            defaultStat="(Con)"
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="intSave"
                                            label="Intelligence"
                                            value={character.intelligence}
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            proficient={character.intSaveProficient}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            defaultStat="(Int)"
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="wisSave"
                                            label="Wisdom"
                                            value={character.wisdom}
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            proficient={character.wisSaveProficient}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            defaultStat="(Wis)"
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="chaSave"
                                            label="Charisma"
                                            value={character.charisma}
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            proficient={character.chaSaveProficient}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            defaultStat="(Cha)"
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                        </div>
                                        <label>Saving Throws</label>
                                    </div>
                                    <div className="charBox">
                                        <div className="charSkills">
                                            <Skill
                                            name="acrobatics"
                                            label="Acrobatics"
                                            value={character.dexterity}
                                            proficient={character.acrobaticsProficient}
                                            defaultStat="(Dex)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="animalHandling"
                                            label="Animal Handling"
                                            proficient={character.animalHandlingProficient}
                                            value={character.wisdom}
                                            defaultStat="(Wis)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="arcana"
                                            label="Arcana"
                                            proficient={character.arcanaProficient}
                                            value={character.intelligence}
                                            defaultStat="(Int)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="athletics"
                                            label="Athletics"
                                            proficient={character.athleticsProficient}
                                            value={character.strength}
                                            defaultStat="(Str)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="deception"
                                            label="Deception"
                                            proficient={character.deceptionProficient}
                                            value={character.charisma}
                                            defaultStat="(Cha)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="history"
                                            label="History"
                                            proficient={character.historyProficient}
                                            value={character.intelligence}
                                            defaultStat="(Int)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="insight"
                                            label="Insight"
                                            proficient={character.insightProficient}
                                            value={character.wisdom}
                                            defaultStat="(Wis)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="intimidation"
                                            label="Intimidation"
                                            proficient={character.intimidationProficient}
                                            value={character.charisma}
                                            defaultStat="(Cha)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="investigation"
                                            label="Investigation"
                                            proficient={character.investigationProficient}
                                            value={character.intelligence}
                                            defaultStat="(Int)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="medicine"
                                            label="Medicine"
                                            proficient={character.medicineProficient}
                                            value={character.wisdom}
                                            defaultStat="(Wis)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="nature"
                                            label="Nature"
                                            proficient={character.natureProficient}
                                            value={character.intelligence}
                                            defaultStat="(Int)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="perception"
                                            label="Perception"
                                            proficient={character.perceptionProficient}
                                            value={character.wisdom}
                                            defaultStat="(Wis)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="performance"
                                            label="Performance"
                                            proficient={character.performanceProficient}
                                            value={character.charisma}
                                            defaultStat="(Cha)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="persuasion"
                                            label="Persuasion"
                                            proficient={character.persuasionProficient}
                                            value={character.charisma}
                                            defaultStat="(Cha)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="religion"
                                            label="Religion"
                                            proficient={character.religionProficient}
                                            value={character.intelligence}
                                            defaultStat="(Int)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="slightOfHand"
                                            label="Sleight of Hand"
                                            proficient={character.slightOfHandProficient}
                                            value={character.dexterity}
                                            defaultStat="(Dex)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="stealth"
                                            label="Stealth"
                                            proficient={character.stealthProficient}
                                            value={character.dexterity}
                                            defaultStat="(Dex)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                            <Skill
                                            name="survival"
                                            label="Survival"
                                            proficient={character.survivalProficient}
                                            value={character.wisdom}
                                            defaultStat="(Wis)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            rollsHistory={this.state.rollsHistory}
                                            rerender={() => this.forceUpdate()}
                                            />
                                        </div>
                                        <label>Skills</label>
                                    </div>
                                    </Col>
                                </Row>
                                <div className="charBox">
                                    <div>
                                        <label className="otherProfs">Proficiencies</label>
                                        <textarea
                                        value={character.otherProficiencies ? character.otherProficiencies : ""}
                                        onChange={(e) => this.characterChange("otherProficiencies", e.target.value)}
                                        rows={6}
                                        className="charInput"
                                        />
                                    </div>
                                    <div>
                                    <label className="otherProfs">Languages</label>
                                        <textarea
                                        value={character.languages ? character.languages : ""}
                                        onChange={(e) => this.characterChange("languages", e.target.value)}
                                        rows={4}
                                        className="charInput"
                                        />
                                    </div>
                                    <label>Other Proficiencies & Languages</label>
                                </div>
                            </Col>
                            <Col md={6} xl={4}>
                                <div className="charBox gray">
                                    <Row>
                                        <Col xs={4}>
                                            <StatBoxCombat
                                            cssClass="shield"
                                            label="AC"
                                            name="ac"
                                            value={character.ac}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                        </Col>
                                        <Col xs={4}>
                                            <StatBoxCombat
                                            label="Initiative"
                                            name="init"
                                            value={character.init}
                                            relevantStat={character.dexterity}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                        </Col>
                                        <Col xs={4}>
                                            <StatBoxCombat
                                            label="Speed"
                                            name="speed"
                                            value={character.speed}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <Col xs={6}>
                                            <div className="heartHP" style={{backgroundImage: `url(${heart})`}}>
                                                <div className="currentHp mb-3">
                                                    <input
                                                        type="number" 
                                                        value={character.hp ? character.hp : ""} 
                                                        onChange={(e) => this.characterChange("hp", e.target.value)}
                                                        className="charInput rounded-pill"
                                                    />
                                                </div>
                                                <div className="tempHp">
                                                    <div className="hpWrapper">
                                                        <span>+</span> 
                                                        <input 
                                                        className="charInput"
                                                        type="number" 
                                                        value={character.tempHp ? character.tempHp : ""} 
                                                        onChange={(e) => this.characterChange("tempHp", e.target.value)} 
                                                        />
                                                    </div>
                                                </div>
                                                <div className="maxHp">
                                                    <div className="hpWrapper">
                                                        <input 
                                                        type="text"
                                                        className="charInput"
                                                        value={character.maxHp ? character.maxHp : ""} 
                                                        onChange={(e) => this.characterChange("maxHp", e.target.value)} 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}>
                                            <StatBoxCombat
                                            label="Hit Dice"
                                            name="hitDie"
                                            value={character.hitDie}
                                            relevantStat={character.classLevel}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                        </Col>
                                        <Col xs={6}>
                                            <div className="charBox deathSaveContainer mt-1">
                                                <DeathSave
                                                label="Successes"
                                                name="deathsaveSuccesses"
                                                value={character.deathsaveSuccesses}
                                                onChange={(name: string, value: any) => {
                                                    this.characterChange(name, value)
                                                }}
                                                rollsHistory={this.state.rollsHistory}
                                                rerender={() => this.forceUpdate()}
                                                />
                                                <DeathSave
                                                cssClass="failure"
                                                label="Failures"
                                                name="deathsaveFailures"
                                                value={character.deathsaveFailures}
                                                onChange={(name: string, value: any) => {
                                                    this.characterChange(name, value)
                                                }}
                                                rollsHistory={this.state.rollsHistory}
                                                rerender={() => this.forceUpdate()}
                                                />
                                                <label className="mt-2" onClick={() => addDiceToHistory(rollSelected("Death saving throw", 20))}>Death Saves</label>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>

                                <div>
                                    {/* attack table */}
                                </div>

                                <div className="charBox">
                                    <Row>
                                        <div className="coinsContainer">
                                            <Coins
                                            label="CP"
                                            name="cp"
                                            value={character.cp}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Coins
                                            label="SP"
                                            name="sp"
                                            value={character.sp}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Coins
                                            label="GP"
                                            name="gp"
                                            value={character.gp}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Coins
                                            label="EP"
                                            name="ep"
                                            value={character.ep}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Coins
                                            label="PP"
                                            name="pp"
                                            value={character.pp}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                        </div>
                                        <Col className="ps-0">
                                            <textarea
                                                className="charInput"
                                                value={character.equipment ? character.equipment : ""}
                                                onChange={(e) => this.characterChange("maxHp", e.target.value)} 
                                                rows={15}
                                            />
                                        </Col>
                                    </Row>
                                    <label>
                                        Equipment
                                    </label>
                                </div>
                            </Col>
                            <Col xl={4}>
                                <div className="charBox gray">
                                    <div className="charPersonality">
                                        <textarea
                                        className="charInput"
                                        value={character.personalityTraits ? character.personalityTraits : ""}
                                        onChange={(e) => this.characterChange("personalityTraits", e.target.value)}
                                        rows={4}/>
                                        <label className="mt-0">Personality Traits</label>
                                    </div>
                                    <div className="charPersonality">
                                        <textarea
                                        className="charInput"
                                        value={character.ideals ? character.ideals : ""}
                                        onChange={(e) => this.characterChange("ideals", e.target.value)}
                                        rows={4}/>
                                        <label className="mt-0">Ideals</label>
                                    </div>
                                    <div className="charPersonality">
                                        <textarea
                                        className="charInput"
                                        value={character.bonds ? character.bonds : ""}
                                        onChange={(e) => this.characterChange("bonds", e.target.value)}
                                        rows={4}/>
                                        <label className="mt-0">Bonds</label>
                                    </div>
                                    <div className="charPersonality">
                                        <textarea
                                        className="charInput"
                                        value={character.flaws ? character.flaws : ""}
                                        onChange={(e) => this.characterChange("flaws", e.target.value)}
                                        rows={4}/>
                                        <label className="mt-0">Flaws</label>
                                    </div>
                                </div>
                                <div className="charBox">
                                    <textarea
                                    className="charInput"
                                    value={character.modifiers ? character.modifiers : ""}
                                    onChange={(e) => this.characterChange("modifiers", e.target.value)}
                                    rows={3}/>
                                    <label className="mt-0">Modifiers</label>
                                </div>
                                <div className="charBox">
                                    <div>
                                        <textarea
                                        className="charInput"
                                        value={character.racialTraits ? character.racialTraits : ""}
                                        onChange={(e) => this.characterChange("racialTraits", e.target.value)}
                                        rows={3}/>
                                        <label className="mt-0 pb-1">Racial Traits</label>
                                    </div>
                                    <div>
                                        <textarea
                                        className="charInput"
                                        value={character.classFeatures ? character.classFeatures : ""}
                                        onChange={(e) => this.characterChange("classFeatures", e.target.value)}
                                        rows={10}/>
                                        <label className="mt-0 pb-1">Class Features</label>
                                    </div>
                                    <div>
                                        <textarea
                                        className="charInput"
                                        value={character.feats ? character.feats : ""}
                                        onChange={(e) => this.characterChange("feats", e.target.value)}
                                        rows={3}/>
                                        <label className="mt-0 pb-1">Feats</label>
                                    </div>  
                                    <div>
                                        <textarea
                                        className="charInput"
                                        value={character.traits ? character.traits : ""}
                                        onChange={(e) => this.characterChange("traits", e.target.value)}
                                        rows={3}/>
                                        <label className="mt-0 pb-1">Traits</label>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="notesContainer pt-3">
                            <Col lg={4} >
                                <div className="charBox miscNotes">
                                    <textarea
                                    className="charInput"
                                    value={character.miscNotes1 ? character.miscNotes1 : ""}
                                    onChange={(e) => this.characterChange("miscNotes1", e.target.value)}
                                    rows={25}
                                    />
                                    <label className="mt-0 pb-1 looksLabel">Miscellaneous notes</label>
                                </div>
                            </Col>
                            <Col lg={4} >
                                <div className="charBox miscNotes">
                                    <textarea
                                    className="charInput"
                                    value={character.miscNotes2 ? character.miscNotes2 : ""}
                                    onChange={(e) => this.characterChange("miscNotes2", e.target.value)}
                                    rows={25}
                                    />
                                    <label className="mt-0 pb-1 looksLabel">Miscellaneous notes</label>
                                </div>
                            </Col>
                            <Col lg={4} >
                                <div className="charBox charLooks">
                                    <Row>
                                        <Col xs={3}>
                                            <input
                                            className="charInput"
                                            type="text" 
                                            value={character.gender ? character.gender : ""}
                                            onChange={(e) => this.characterChange("gender", e.target.value)}/>
                                            <label className="looksLabel">Gender</label>
                                        </Col>
                                        <Col xs={3}>
                                            <input
                                            className="charInput"
                                            type="text" 
                                            value={character.age ? character.age : ""}
                                            onChange={(e) => this.characterChange("age", e.target.value)}
                                            />
                                            <label className="looksLabel">Age</label>
                                        </Col>
                                        <Col xs={3}>
                                            <input
                                            className="charInput"
                                            type="text" 
                                            value={character.height ? character.height : ""}
                                            onChange={(e) => this.characterChange("height", e.target.value)}
                                            />
                                            <label className="looksLabel">Height</label>
                                        </Col>
                                        <Col xs={3}>
                                            <input
                                            className="charInput"
                                            type="text" 
                                            value={character.weight ? character.weight : ""}
                                            onChange={(e) => this.characterChange("weight", e.target.value)}
                                            />
                                            <label className="looksLabel">Weight</label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4}>
                                            <input
                                            className="charInput"
                                            type="text" 
                                            value={character.eyes ? character.eyes : ""}
                                            onChange={(e) => this.characterChange("eyes", e.target.value)}
                                            />
                                            <label className="looksLabel">Eyes</label>
                                        </Col>
                                        <Col xs={4}>
                                            <input
                                            className="charInput"
                                            type="text" 
                                            value={character.skin ? character.skin : ""}
                                            onChange={(e) => this.characterChange("skin", e.target.value)}
                                            />
                                            <label className="looksLabel">Skin</label>
                                        </Col>
                                        <Col xs={4}>
                                            <input
                                            className="charInput"
                                            type="text" 
                                            value={character.hair ? character.hair : ""}
                                            onChange={(e) => this.characterChange("hair", e.target.value)}
                                            />
                                            <label className="looksLabel">Hair</label>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="charBox miscNotes">
                                    <textarea
                                    className="charInput"
                                    value={character.appeareance ? character.appeareance : ""}
                                    onChange={(e) => this.characterChange("appeareance", e.target.value)}
                                    rows={5}
                                    />
                                    <label className="mt-0 looksLabel">Appeareance</label>
                                </div>
                                <div className="charBox miscNotes">
                                    <textarea
                                    className="charInput"
                                    value={character.backstory ? character.backstory : ""}
                                    onChange={(e) => this.characterChange("backstory", e.target.value)}
                                    rows={12}
                                    />
                                    <label className="mt-0 looksLabel">Backstory</label>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between">
                    <Button variant="danger" onClick={() => this.deleteCharacter(character.id)}>
                        Delete Character
                    </Button>
                    <Button variant="secondary" className="text-light" onClick={this.state.isNewCharacter? this.newCharacter : this.updateCharacter}>
                    {this.state.isNewCharacter? "Create character" : "Save Changes"}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}