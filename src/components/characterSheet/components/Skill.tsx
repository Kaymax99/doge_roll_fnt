import { statModCalculator } from "../StatsLogic";
import { SkillsProps } from "./StatInterfaces";

export const Skill = ({name, value, label, onChange, proficient, defaultStat, cssClass, proficiencyBonus}: SkillsProps) => {
    let classes = "charSkills my-1"
    if (cssClass) {
        classes += " " + cssClass
    }
    let skillMod;
    const statMod = statModCalculator(value);

    
    if (statMod) {
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


    //name + "Proficient", !proficient
    
    return (
        <div className={classes}>
            <div className={proficient === "proficient" ? "charSkillsCheckbox proficient" : proficient === "expertise" ? "charSkillsCheckbox expertise" : "charSkillsCheckbox"}
            onClick={() => handleClick()}/>
            <span>{skillMod != undefined && skillMod >= 0 ? "+" + skillMod : skillMod}</span>
            <label className="skillName">{label}</label>
            {defaultStat ? (
                <span className='charSkillDefaultStat'>{defaultStat}</span>
            ) : ""}
        </div>
    )
}