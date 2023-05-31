import { AttacksBoxProps, IAttack } from "./StatInterfaces"
import { AttackSlot } from "./AttackSlot"

export const AttacksBox = ({slots, name, value, onChange, str, dex, con, int, wis, cha, profBonus, rollsHistory, rerender}: AttacksBoxProps) => {

    
    const getValue = () => {
        let newValue = value
        if (!newValue) {
            newValue = []
        }
        if (slots) {
            while (newValue.length < slots) {
                newValue.push({})
            }
        }
        return newValue
    }

    const updateValue = (index: React.Key, field: string, newVal: string | boolean | number) => {
        const value = getValue().slice()
        if (field === "critRange") {
            if (Number(newVal) > 20) {
                newVal = 20
            } else if (Number(newVal) < 0) {
                newVal = 1
            }
        }
        value[index][field] = newVal
        if (onChange && name) {
            onChange(name, value)
        }
      }

    return (
        <div className="charAttacksBox">
            {getValue().sort(function(a: IAttack, b: IAttack) { 
                return a.id - b.id;
                }).map(
                    (val: IAttack, index: string
                    ) => {
                        return (
                            <AttackSlot 
                            key={"charAttacksBox" + index} 
                            value={val} updateValue={updateValue} 
                            index={index} 
                            str={str}
                            dex={dex}
                            con={con}
                            int={int}
                            wis={wis}
                            cha={cha}
                            profBonus={profBonus}
                            rollsHistory={rollsHistory}
                            rerender={rerender}
                            />
                        )
                    })}
            <label>Attacks</label>
        </div>
    )
}