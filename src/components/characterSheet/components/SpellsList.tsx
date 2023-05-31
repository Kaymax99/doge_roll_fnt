import { Col, Form, Row } from "react-bootstrap"
import DnDCharacter from "../DnDCharacter"
import { setCharProficiency, statModCalculator } from "../StatsLogic"
import { rollSelected } from "../../../hooks/diceRolling"
import { SpellTable } from "./SpellTable"

interface SpellListProps {
    character: DnDCharacter
    onChange: (name: string, value: any) => void
    addToHistory: (result: string) => void
}

export const SpellsList = ({character, onChange, addToHistory}:SpellListProps) => {

    let spellMod: number | undefined;

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
            if (type === "DC") {
                return 8 + Number(proficiencyBonus)
            } else {
                return "+" + Number(proficiencyBonus)
            }
        }
    }

    return (
        <Row className="charSheetInfo">
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
                        <span className="spellRndBorder">
                            {calcModifiers(setCharProficiency(character.classLevel), spellMod, "DC")}
                        </span>
                        <label>DC</label>
                    </Col>
                    <Col xs={4} className="spellsStats">
                        <span className="spellRndBorder" onClick={() => addToHistory(rollSelected("Spell Attack", 20, spellMod, "(" + character.spellcastingAbility + ")", "proficient", setCharProficiency(character.classLevel)))}>
                            {calcModifiers(setCharProficiency(character.classLevel), spellMod, "ATK")}
                        </span>
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
            </Col>
                <Row className="spellList m-0">
                    <Col xs={12} md={6} lg={4}>
                        <div className="charBox">
                            <SpellTable
                            level={0}
                            rows={8}
                            name="cantrips"
                            value={character.cantrips}
                            onChange={onChange}
                            />
                            <SpellTable
                            level={1}
                            rows={13}
                            name="lvl1Spells"
                            value={character.lvl1Spells}
                            slotsValue={character.lvl1SpellSlotsMax}
                            slotsUsedValue={character.lvl1SpellSlotsUsed}
                            slotsName='lvl1SpellSlotsMax'
                            slotsUsedName='lvl1SpellSlotsUsed'
                            onChange={onChange}
                            showLabels
                            />
                            <SpellTable
                            level={2}
                            rows={12}
                            name="lvl2Spells"
                            value={character.lvl2Spells}
                            slotsValue={character.lvl2SpellSlotsMax}
                            slotsUsedValue={character.lvl2SpellSlotsUsed}
                            slotsName='lvl2SpellSlotsMax'
                            slotsUsedName='lvl2SpellSlotsUsed'
                            onChange={onChange}
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                        <div className="charBox">
                            <SpellTable
                            level={3}
                            rows={13}
                            name="lvl3Spells"
                            value={character.lvl3Spells}
                            slotsValue={character.lvl3SpellSlotsMax}
                            slotsUsedValue={character.lvl3SpellSlotsUsed}
                            slotsName='lvl3SpellSlotsMax'
                            slotsUsedName='lvl3SpellSlotsUsed'
                            onChange={onChange}
                            />
                            <SpellTable
                            level={4}
                            rows={13}
                            name="lvl4Spells"
                            value={character.lvl4Spells}
                            slotsValue={character.lvl4SpellSlotsMax}
                            slotsUsedValue={character.lvl4SpellSlotsUsed}
                            slotsName='lvl4SpellSlotsMax'
                            slotsUsedName='lvl4SpellSlotsUsed'
                            onChange={onChange}
                            />
                            <SpellTable
                            level={5}
                            rows={9}
                            name="lvl5Spells"
                            value={character.lvl5Spells}
                            slotsValue={character.lvl5SpellSlotsMax}
                            slotsUsedValue={character.lvl5SpellSlotsUsed}
                            slotsName='lvl5SpellSlotsMax'
                            slotsUsedName='lvl5SpellSlotsUsed'
                            onChange={onChange}
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={6} lg={4} className="mx-auto">
                        <div className="charBox">
                        <SpellTable
                            level={6}
                            rows={10}
                            name="lvl6Spells"
                            value={character.lvl6Spells}
                            slotsValue={character.lvl6SpellSlotsMax}
                            slotsUsedValue={character.lvl6SpellSlotsUsed}
                            slotsName='lvl6SpellSlotsMax'
                            slotsUsedName='lvl6SpellSlotsUsed'
                            onChange={onChange}
                        />
                        <SpellTable
                            level={7}
                            rows={9}
                            name="lvl7Spells"
                            value={character.lvl7Spells}
                            slotsValue={character.lvl7SpellSlotsMax}
                            slotsUsedValue={character.lvl7SpellSlotsUsed}
                            slotsName='lvl7SpellSlotsMax'
                            slotsUsedName='lvl7SpellSlotsUsed'
                            onChange={onChange}
                        />
                        <SpellTable
                            level={8}
                            rows={7}
                            name="lvl8Spells"
                            value={character.lvl8Spells}
                            slotsValue={character.lvl8SpellSlotsMax}
                            slotsUsedValue={character.lvl8SpellSlotsUsed}
                            slotsName='lvl8SpellSlotsMax'
                            slotsUsedName='lvl8SpellSlotsUsed'
                            onChange={onChange}
                        />
                        <SpellTable
                            level={9}
                            rows={7}
                            name="lvl9Spells"
                            value={character.lvl9Spells}
                            slotsValue={character.lvl9SpellSlotsMax}
                            slotsUsedValue={character.lvl9SpellSlotsUsed}
                            slotsName='lvl9SpellSlotsMax'
                            slotsUsedName='lvl9SpellSlotsUsed'
                            onChange={onChange}
                        />
                        </div>
                    </Col>
                </Row>
        </Row>
    )
}