import { StatProps } from "./StatInterfaces";

export const StatRow = ({name, value, label, onChange, cssClass}: StatProps) => {
    let classes = "charStatRow"
    if (cssClass) {
        classes += " " + cssClass
    }

    return (
        <div className={classes}>
            <div className="charStatRowVal">
                {name === "proficiencyBonus" ? 
                <p>
                    {value}
                </p> 
                : 
                <input
                type="text"
                value={value? value : ""}
                onChange={(e) => onChange(name, e.target.value)}/>}
                
            </div>
            <div className="charStatRowLabel">
                <label>{label}</label>
            </div>
        </div>
    )

}