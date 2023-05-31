import { StatSelect } from "./statSelect"
import { AttackSlotProps } from "./StatInterfaces"
import { ChangeEvent, useEffect, useState } from "react";
import { statModCalculator } from "../StatsLogic";
import { Form } from "react-bootstrap";
import { rollAttack } from "../../../hooks/diceRolling";

export const AttackSlot = ({value, updateValue, index, str, dex, con, int, wis, cha, profBonus, rollsHistory, rerender}: AttackSlotProps) => {
    const [usedStat, setUsedStat] = useState("str");
    let statMod: number | undefined;
    let totAtkMod;

    useEffect(() => {
        if (!value.critRange) {
            updateValue(index, "critRange", 20)
        }
        if (!value.diceType) {
            updateValue(index, "diceType", "d8")
        }
        if (!value.diceQnt) {
            updateValue(index, "diceQnt", 0)
        }
    }, [])

    const handleDiceChange = (e: ChangeEvent<HTMLSelectElement>) => {
        updateValue(index, "diceType", e.target.value)
    }

    const calcRollAvg = () => {
        const dice = Number(value?.diceType?.slice(1))
        let avg = 0
        for (let i = 1; i <= dice; i++) {
            avg = avg + i
        }
        return value.diceQnt * (avg / dice)
    }

    switch (usedStat) {
        case "str":
            statMod = statModCalculator(str)
            break;
        case "dex":
            statMod = statModCalculator(dex)
            break;
        case "con":
            statMod = statModCalculator(con)
            break;
        case "int":
            statMod = statModCalculator(int)
            break;
        case "wis":
            statMod = statModCalculator(wis)
            break;
        case "cha":
            statMod = statModCalculator(cha)
            break;
        default:
            break;
    }

    const handleClick = () => {
        updateValue(index, "proficiency", !value.proficiency)
    }
    if (value.proficiency && statMod !== undefined && profBonus) {
        totAtkMod = statMod + profBonus
    } else {
        totAtkMod = statMod
    }
    if (value.bonus && totAtkMod) {
        totAtkMod = totAtkMod + Number(value.bonus)
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
        <div className="atkSlot">
            <span className="arkSlotName">
                <Form.Control
                type="text"
                value={value.name ? value.name : ""}
                onChange={(e) => updateValue(index, "name", e.target.value)}
                />
            </span>
            <div className="arkSlotRollInfo">
                <span onClick={() => addDiceToHistory(rollAttack(value.name, value.diceQnt, value.diceType, statMod, usedStat, value.critRange, profBonus))}>
                    {totAtkMod !== undefined && totAtkMod >= 0 ? "+" + totAtkMod : totAtkMod}
                </span>
                <span>
                    (
                </span>
                <span className={value.proficiency ? "atkCheckbox proficient" : "atkCheckbox"}
                onClick={() => handleClick()}/>
                <span>
                    +
                </span>
                <span>
                    <StatSelect usedStat={usedStat} setUsedStat={setUsedStat} />
                </span>
                <span>
                    +
                </span>
                <span>
                    <input
                    type="number"
                    className="atkExtraMod"
                    value={value.bonus ? value.bonus : ""}
                    onChange={(e) => updateValue(index, "bonus", e.target.value)}
                    />
                </span>
                <span>
                )
                </span>
                <span>
                    to hit,
                </span>
                <span>
                    crit range
                </span>

                <span>
                    <input
                    type="number"
                    min={1}
                    max={20}
                    className="atkCritRange"
                    value={value.critRange ? value.critRange : ""}
                    onChange={(e) => updateValue(index, "critRange", e.target.value)}
                    />
                </span>
            </div>
            <div className="arkSlotRollInfo">
                <span className="text-muted">Hit:</span> 
                {value?.bonusAtk ? Math.floor(calcRollAvg()) + Number(value.bonusAtk) : value.diceType ? Math.floor(calcRollAvg()) : 0}
                (
                <span>
                    <input
                    type="number"
                    className="atkDiceQnt"
                    value={value.diceQnt ? value.diceQnt : ""}
                    onChange={(e) => updateValue(index, "diceQnt", e.target.value)}
                    />
                    <select value={value.diceType ? value.diceType : ""} onChange={handleDiceChange} className="atkStatSelect">
                        <option value="d2">d2</option>
                        <option value="d4">d4</option>
                        <option value="d6">d6</option>
                        <option value="d8">d8</option>
                        <option value="d10">d10</option>
                        <option value="d12">d12</option>
                        <option value="d20">d20</option>
                    </select>
                    +
                    <span className="dmgStat">
                        {usedStat}
                    </span>
                    +
                    <input
                    type="number"
                    className="atkDiceQnt"
                    value={value.bonusAtk ? value.bonusAtk : ""}
                    onChange={(e) => updateValue(index, "bonusAtk", e.target.value)}
                    />
                </span>
                )
                <input
                    type="text"
                    className="atkDmgType"
                    placeholder="slashing"
                    value={value.damageType ? value.damageType : ""}
                    onChange={(e) => updateValue(index, "damageType", e.target.value)}
                />
                damage
            </div>
        </div>
    )
}