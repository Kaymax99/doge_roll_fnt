import { rollSelected } from "../../../hooks/diceRolling";
import { statModCalculator } from "../StatsLogic";
import { SkillsProps } from "./StatInterfaces";

export const Skill = ({name, value, label, onChange, proficient, defaultStat, cssClass, proficiencyBonus, rollsHistory, rerender}: SkillsProps) => {
    let classes = "charSkills my-1"
    if (cssClass) {
        classes += " " + cssClass
    }
    let skillMod: number | undefined;
    const statMod = statModCalculator(value);

    
    if (statMod !== undefined) {
        if (proficient === "expertise") {
            skillMod = statMod + (Number(proficiencyBonus)*2)
        } else if (proficient === "proficient") {
            skillMod = statMod + Number(proficiencyBonus)
        } else {
            skillMod = statMod
        }
    }

    const handleClick = () => {
        if (proficient === "expertise") {
            onChange(name + "Proficient", "not proficient")
        } else if (proficient === "proficient") {
            onChange(name + "Proficient", "expertise")
        } else  {
            onChange(name + "Proficient", "proficient")
        }
    }
    const addDiceToHistory = (result: string) => {
        if (rollsHistory?.length) {
            if (rollsHistory?.length < 10) {
                rollsHistory?.push(result)
            } else {
                rollsHistory.shift()
                rollsHistory?.push(result)
            }
        }
        rerender()
    }
    return (
        <div className={classes}>
            <div className={proficient === "proficient" ? "charSkillsCheckbox proficient" : proficient === "expertise" ? "charSkillsCheckbox expertise" : "charSkillsCheckbox"}
            onClick={() => handleClick()}/>
            <span onClick={() => addDiceToHistory(rollSelected(name.slice(-4) === "Save" ? label + " saving throw" : label, 20, statMod, defaultStat, proficient, Number(proficiencyBonus)))}>{skillMod != undefined && skillMod >= 0 ? "+" + skillMod : skillMod}</span>
            <label className="skillName">{label}</label>
            {defaultStat ? (
                <span className='charSkillDefaultStat'>{defaultStat}</span>
            ) : ""}
        </div>
    )
}