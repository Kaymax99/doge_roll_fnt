import { Col, Form, Row } from "react-bootstrap"
import DnDCharacter from "../DnDCharacter"
import { setCharProficiency, statModCalculator } from "../StatsLogic"

interface SpellListProps {
    character: DnDCharacter
    onChange: (name: string, value: any) => void
}

export const SpellsList = ({character, onChange}:SpellListProps) => {

    let spellMod;

    switch (character.spellcastingAbility) {
        case "Strength":
            spellMod = statModCalculator(character.strength)
            break;
        case "Dexterity":
            spellMod = statModCalculator(character.dexterity)
            break;
        case "Constitution":
            spellMod = statModCalculator(character.constitution)
            break;
        case "Intelligence":
            spellMod = statModCalculator(character.intelligence)
            break;
        case "Wisdom":
            spellMod = statModCalculator(character.wisdom)
            break;
        case "Charisma":
            spellMod = statModCalculator(character.charisma)
            break;
        default:
            break;
    }

    const calcModifiers = (proficiencyBonus: number, spellModifier: number | undefined, type: string) => {
        if (spellModifier !== undefined) {
            if (type === "DC") {
                return 8 + Number(proficiencyBonus) + spellModifier
            } else {
                return "+" + (Number(proficiencyBonus) + spellModifier)
            }
        } else {
            return 0
        }
    }

    return (
        <Row className="charSheetInfo mt-3">
            <Col className="spellsRndBorder">
                <Row>
                    <Col xs={6} className="spellsStats">
                        <span className="spellRndBorder spellAbility">
                            <select value={character.spellcastingAbility ? character.spellcastingAbility : "Intelligence"} onChange={(e) => onChange("spellcastingAbility", e.target.value)} className="spellAbilitySelect">
                                <option value="Strength">Strength</option>
                                <option value="Dexterity">Dexterity</option>
                                <option value="Constitution">Constitution</option>
                                <option value="Intelligence">Intelligence</option>
                                <option value="Wisdom">Wisdom</option>
                                <option value="Charisma">Charisma</option>
                            </select>
                        </span>
                        <label>Ability</label>
                    </Col>
                    <Col xs={6} className="spellsStats">
                        <span className="spellRndBorder spellAbility">
                            <select value={character.spellcastingType ? character.spellcastingType : "9th Level"} onChange={(e) => onChange("spellcastingAbility", e.target.value)} className="spellAbilitySelect">
                                <option value="Strength">9th Level</option>
                                <option value="Dexterity">Warlock</option>
                            </select>
                        </span>
                        <label>Spellcasting</label>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} className="spellsStats">
                        <span className="spellRndBorder">{calcModifiers(setCharProficiency(character.classLevel), spellMod, "DC")}</span>
                        <label>DC</label>
                    </Col>
                    <Col xs={4} className="spellsStats">
                        <span className="spellRndBorder">{calcModifiers(setCharProficiency(character.classLevel), spellMod, "ATK")}</span>
                        <label>Attack</label>
                    </Col>
                    <Col xs={4} className="spellsStats">
                        <span className="spellRndBorder">
                            <input
                            type="number"
                            value={character.knownSpells ? character.knownSpells : ""}
                            onChange={(e) => onChange("knownSpells", e.target.value)}
                            className="knownSpells"
                            />
                        </span>
                        <label>Known</label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="charBox">

                        </div>
                    </Col>
                    <Col>
                        <div className="charBox">

                        </div>
                    </Col>
                    <Col>
                        <div className="charBox">

                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}