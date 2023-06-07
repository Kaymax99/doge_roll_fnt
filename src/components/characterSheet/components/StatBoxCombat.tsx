import { rollSelected } from "../../../hooks/diceRolling"
import { statModCalculator } from "../StatsLogic"
import { CombatStatProps } from "./StatInterfaces"

export const StatBoxCombat = ({name, value, label, onChange, cssClass, relevantStat, rollsHistory, rerender, defaultStat}:CombatStatProps) => {
    let classes = "charStatBox combat"
    if (cssClass) {
        classes += " " + cssClass
    }
    const modifier = statModCalculator(relevantStat)
    
    if (name === "hitDie") {
        if (Number(value) >= Number(relevantStat)) {
            value = relevantStat
        } else if (Number(value) < 0) {
            value = "1"
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
        <div>
            <div className={classes}>
                {name !== "hitDie" ? 
                    <div className="charStatboxMod">
                        {name !== "init" ? <input 
                        type="text"
                        value={value ? value : ""}
                        onChange={(e) => onChange(name, e.target.value)}
                        className="charInput"
                        /> : <span onClick={() => addDiceToHistory(rollSelected(label, 20, modifier, defaultStat))}>{modifier != undefined && modifier >= 0 ? "+" + modifier : modifier}</span>}
                    </div>
                    : 
                    <div className="charStatboxMod hitDieContainer">
                        <div className=" mx-auto text-center">
                            <input
                            type="number"
                            value={value ? value : ""}
                            onChange={(e) => onChange(name, e.target.value)}
                            className="hitDie fs-5 charInput"
                            min={0}
                            max={relevantStat}
                            /> 
                            <p className="fs-5 hitDieMax d-inline-block">/ {relevantStat}</p>
                        </div>
                    </div>}
                {name === "init" ? <label className="fs-normal mt-2">(Dex)</label> : ""}
                <div>
                    <label>{label}</label>
                </div>
            </div>
        </div>

    )
}