import { statModCalculator } from "../StatsLogic"
import { StatProps } from "./StatInterfaces"

export const StatBox = ({name, value, label, onChange, cssClass}: StatProps) => {

    let classes = "charStatBox"
    if (cssClass) {
        classes += " " + cssClass
    }

    const modifier = statModCalculator(value)

    return (
        <div>
            <div className={classes}>
                <label>{label}</label>
                <div className='charStatboxMod'>{modifier != undefined && modifier >= 0 ? "+" + modifier : modifier}</div>
            </div>
            <div className='charStatboxVal'>
                <input
                type='text'
                value={value ? value : ''}
                onChange={(e) => onChange(name, e.target.value)}
                />
            </div>
        </div>
    )

}