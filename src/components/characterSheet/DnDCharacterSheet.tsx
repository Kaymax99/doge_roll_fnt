import { Component } from "react";
import { Col, Container, Row, Button, Modal } from "react-bootstrap";
import DnDCharacter from "./DnDCharacter";
import { createCharacter } from "../../hooks/fetch/gameFetches";
import { StatBox } from "./components/StatBox";
import { StatRow } from "./components/StatRow";
import { setCharMaxXP, setCharProficiency } from "./StatsLogic";
import { Skill } from "./components/Skill";
import { StatBoxCombat } from "./components/StatBoxCombat";
import heart from "../../assets/img/heart-frame.png";
import { DeathSave } from "./components/DeathSave";
import { Coins } from "./components/Coins";

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
        console.log(this.state.character)
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
        e.preventDefault();
        createCharacter("", this.state.character,this.props.updateChars)
        this.props.handleClose();
    }

    render() {
        const character = this.checkForCharChange()

        return (
            <Modal show={this.props.show} onHide={this.props.handleClose} className="characterModal">
                <Modal.Header closeButton className="d-flex justify-content-between">
                    <Modal.Title className="mb-2 me-3">{character ? character.name : "New Character"}</Modal.Title>
                    {this.state.isNewCharacter? "" : 
                    <Button variant="danger" onClick={this.discardChanges}>
                        Reset character to last saved state (undo recent changes)
                    </Button>
                    }
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
                            <Col lg={4}>
                                <Row>
                                    <Col xs={5} className="mx-auto statBoxContainer">
                                        <div className='charBox gray pb-0'>
                                            <StatBox
                                            label='Strength'
                                            name='str'
                                            value={character.str}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}/>
                                            <StatBox
                                            label='Dexterity'
                                            name='dex'
                                            value={character.dex}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}/>
                                            <StatBox
                                            label='Constitution'
                                            name='con'
                                            value={character.con}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}/>
                                            <StatBox
                                            label='Intelligence'
                                            name='int'
                                            value={character.int}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}/>
                                            <StatBox
                                            label='Wisdom'
                                            name='wis'
                                            value={character.wis}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}/>
                                            <StatBox
                                            label='Charisma'
                                            name='cha'
                                            value={character.cha}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
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
                                            value={character.str}
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            proficient={character.strSaveProficient}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="dexSave"
                                            label="Dexterity"
                                            value={character.dex}
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            proficient={character.dexSaveProficient}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="conSave"
                                            label="Constitution"
                                            value={character.con}
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            proficient={character.conSaveProficient}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="intSave"
                                            label="Intelligence"
                                            value={character.int}
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            proficient={character.intSaveProficient}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="wisSave"
                                            label="Wisdom"
                                            value={character.wis}
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            proficient={character.wisSaveProficient}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="chaSave"
                                            label="Charisma"
                                            value={character.cha}
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            proficient={character.chaSaveProficient}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            
                                        </div>
                                        <label>Saving Throws</label>
                                    </div>
                                    <div className="charBox">
                                        <div className="charSkills">
                                            
                                            <Skill
                                            name="acrobatics"
                                            label="Acrobatics"
                                            value={character.dex}
                                            proficient={character.acrobaticsProficient}
                                            defaultStat="(Dex)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="animalHandling"
                                            label="Animal Handling"
                                            proficient={character.animalHandlingProficient}
                                            value={character.wis}
                                            defaultStat="(Wis)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="arcana"
                                            label="Arcana"
                                            proficient={character.arcanaProficient}
                                            value={character.int}
                                            defaultStat="(Int)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="athletics"
                                            label="Athletics"
                                            proficient={character.athleticsProficient}
                                            value={character.str}
                                            defaultStat="(Str)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="deception"
                                            label="Deception"
                                            proficient={character.deceptionProficient}
                                            value={character.cha}
                                            defaultStat="(Cha)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="history"
                                            label="History"
                                            proficient={character.historyProficient}
                                            value={character.int}
                                            defaultStat="(Int)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="insight"
                                            label="Insight"
                                            proficient={character.insightProficient}
                                            value={character.wis}
                                            defaultStat="(Wis)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="intimidation"
                                            label="Intimidation"
                                            proficient={character.intimidationProficient}
                                            value={character.cha}
                                            defaultStat="(Cha)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="investigation"
                                            label="Investigation"
                                            proficient={character.investigationProficient}
                                            value={character.int}
                                            defaultStat="(Int)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="medicine"
                                            label="Medicine"
                                            proficient={character.medicineProficient}
                                            value={character.wis}
                                            defaultStat="(Wis)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="nature"
                                            label="Nature"
                                            proficient={character.natureProficient}
                                            value={character.int}
                                            defaultStat="(Int)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="perception"
                                            label="Perception"
                                            proficient={character.perceptionProficient}
                                            value={character.wis}
                                            defaultStat="(Wis)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="performance"
                                            label="Performance"
                                            proficient={character.performanceProficient}
                                            value={character.cha}
                                            defaultStat="(Cha)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="persuasion"
                                            label="Persuasion"
                                            proficient={character.persuasionProficient}
                                            value={character.cha}
                                            defaultStat="(Cha)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="religion"
                                            label="Religion"
                                            proficient={character.religionProficient}
                                            value={character.int}
                                            defaultStat="(Int)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="slightOfHand"
                                            label="Sleight of Hand"
                                            proficient={character.slightOfHandProficient}
                                            value={character.dex}
                                            defaultStat="(Dex)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="stealth"
                                            label="Stealth"
                                            proficient={character.stealthProficient}
                                            value={character.dex}
                                            defaultStat="(Dex)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
                                            />
                                            <Skill
                                            name="survival"
                                            label="Survival"
                                            proficient={character.survivalProficient}
                                            value={character.wis}
                                            defaultStat="(Wis)"
                                            proficiencyBonus={setCharProficiency(character.classLevel)}
                                            onChange={(name: string, value: any) => {
                                                this.characterChange(name, value)
                                            }}
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
                            <Col lg={4}>
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
                                            relevantStat={character.dex}
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
                                                        type="text" 
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
                                                        type="text" 
                                                        value={character.tempHp ? character.tempHp : ""} 
                                                        onChange={(e) => this.characterChange("tempHp", e.target.value)} 
                                                        />
                                                    </div>
                                                </div>
                                                <div className="maxHp">
                                                    <div className="hpWrapper">
                                                        <input 
                                                        type="text" 
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
                                            <div className="charBox deathSaveContainer">
                                                <DeathSave
                                                label="Successes"
                                                name="deathsaveSuccesses"
                                                value={character.deathsaveSuccesses}
                                                onChange={(name: string, value: any) => {
                                                    this.characterChange(name, value)
                                                }}
                                                />
                                                <DeathSave
                                                cssClass="failure"
                                                label="Failures"
                                                name="deathsaveFailures"
                                                value={character.deathsaveFailures}
                                                onChange={(name: string, value: any) => {
                                                    this.characterChange(name, value)
                                                }}
                                                />
                                                <label>Death Saves</label>
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
                            <Col lg={4}>
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
                <Modal.Footer className="d-flex justify-content-end">
                <Button variant="secondary" className="text-light" onClick={this.state.isNewCharacter? this.newCharacter : this.updateCharacter}>
                {this.state.isNewCharacter? "Create character" : "Save Changes"}
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}