import { rollSelected } from "../../../hooks/diceRolling"
import { statModCalculator } from "../StatsLogic"
import { StatProps } from "./StatInterfaces"

export const StatBox = ({name, value, label, onChange, cssClass, rollsHistory, rerender, defaultStat}: StatProps) => {

    let classes = "charStatBox"
    if (cssClass) {
        classes += " " + cssClass
    }

    const modifier = statModCalculator(value)

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
        <div>
            <div className={classes} onClick={() => addDiceToHistory(rollSelected(label + " Check", 20, modifier, defaultStat))}>
                <label>{label}</label>
                <div className='charStatboxMod'>{modifier != undefined && modifier >= 0 ? "+" + modifier : modifier}</div>
            </div>
            <div className='charStatboxVal'>
                <input
                type='number'
                value={value ? value : ''}
                onChange={(e) => onChange(name, e.target.value)}
                className="charInput"
                />
            </div>
        </div>
    )

}