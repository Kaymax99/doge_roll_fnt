import { StatProps } from "./StatInterfaces";

export const DeathSave = ({name, value, label, onChange, cssClass}: StatProps) => {
    let classes = "charStatDeathSave"
    if (cssClass) {
        classes += " " + cssClass
    }

    return (
        <div className={classes}>
            <label className="d-block grayLabel">{label}</label>
            <div className={value && Number(value) >= 1 ? "charSkillsCheckbox proficient": "charSkillsCheckbox"}
            onClick={() => onChange(name, value === 1 ? 0 : 1)}/>
            =
            <div className={value && Number(value) >= 2 ? "charSkillsCheckbox proficient": "charSkillsCheckbox"}
            onClick={() => onChange(name, value === 2 ? 0 : 2)}/>
            =
            <div className={value && Number(value) >= 3 ? "charSkillsCheckbox proficient": "charSkillsCheckbox"}
            onClick={() => onChange(name, value === 3 ? 0 : 3)}/>
        </div>
    )
}